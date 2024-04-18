import { useReducer } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";
const SECS_PER_QUESTION = 30;

const QuizContext = createContext();


const initialState = {
  question: [],
  // "loading", "error", "ready", "active", "finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, question: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active", secondsRemaining: state.question.length * SECS_PER_QUESTION };
    case "newAnswer":
      const question = state.question[state.index]
      return {
        ...state,
        answer: action.payload,
        points: question.correctOption === action.payload ?
          state.points + question.points :
          state.points
      }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore: state.points > state.highscore ?
          state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        highscore: state.highscore,
        question: state.question
      }
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining <= 0 ? "finished" : state.status
      }
    default:
      throw new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
  const [{ question, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState);
  const numQuestions = question.length;
  const maxPoints = question.reduce((acc, q) => acc + q.points, 0);
  const currentQuestion = question[index];

  useEffect(function () {
    async function fetchQuestion() {
      try {
        const res = await fetch("http://localhost:9000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data })
      } catch (err) {
        dispatch({ type: "dataFailed" })
      }
    }
    fetchQuestion();
  }, [])


  return <QuizContext.Provider value={{
    question: question[index],
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    numQuestions,
    maxPoints,
    dispatch,
  }}>
    {children}
  </QuizContext.Provider>
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };