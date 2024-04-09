function Option({ question, dispatch, answer }) {
  const hasAmswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer? "answer" : ""} ${hasAmswered && (index === question.correctOption? "correct" : "wrong")}`}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAmswered}
        >{option}
        </button>
      ))}
    </div>
  )
}

export default Option
