function Progress({ numQuestions, i, points, maxPoints, answer }) {
  return (
    <header className="progress">
      <progress type="range" max={numQuestions} value={i + Number(answer !== null)}></progress>
      <p>Question <strong>{i + 1}</strong> / {numQuestions}</p>
      <p>Points <strong>{points}</strong> / {maxPoints}</p>
    </header>
  )
}

export default Progress
