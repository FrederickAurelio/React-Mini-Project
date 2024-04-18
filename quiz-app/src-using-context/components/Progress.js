import { useQuiz } from "../contexts/QuizContext"

function Progress() {
  const { numQuestions, index, points, maxPoints, answer } = useQuiz();
  return (
    <header className="progress">
      <progress type="range" max={numQuestions} value={index + Number(answer !== null)}></progress>
      <p>Question <strong>{index + 1}</strong> / {numQuestions}</p>
      <p>Points <strong>{points}</strong> / {maxPoints}</p>
    </header>
  )
}

export default Progress
