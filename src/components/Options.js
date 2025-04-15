function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            disabled={hasAnswered}
            className={`btn-option btn ${
              hasAnswered
                ? index === question.correctOption
                  ? 'correct'
                  : 'wrong'
                : ''
            }  ${index === answer ? 'answer' : ''}`}
            key={option}
            onClick={() => dispatch({ type: 'newAnswer', payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Options;
