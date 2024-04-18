import { useQuiz } from "../contexts/QuizContext";
import Option from "./Option";

function Question() {
  const { question } = useQuiz();
  return (
    <div>
      <h4>{question.question}</h4>
      <Option />
    </div>
  )
}

export default Question
