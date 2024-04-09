import { useEffect, useReducer } from "react"
import Header from "./Header"
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./startScreen"
import Question from "./Question"
import NextButton from "./NextButton"
import Progress from "./Progress"
import FinishScreen from "./FinishScreen"
import Timer from "./Timer"
import Footer from "./Footer"

const SECS_PER_QUESTION = 30;

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
      return { ...state, status: "active", secondsRemaining: state.question.length * SECS_PER_QUESTION};
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

export default function App() {
  const [{ question, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState);
  const numQuestions = question.length;
  const maxPoints = question.reduce((acc, q) => acc + q.points, 0);

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

  return (
    <div className="app">
      <Header />
      <Main >
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" &&
          <>
            <Progress numQuestions={numQuestions} i={index} points={points} maxPoints={maxPoints} answer={answer} />
            <Question question={question[index]} dispatch={dispatch} answer={answer} />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
            </Footer>
          </>
        }
        {status === "finished" && <FinishScreen points={points} maxPoints={maxPoints} highscore={highscore} dispatch={dispatch} />}
      </Main>
    </div>
  )
}