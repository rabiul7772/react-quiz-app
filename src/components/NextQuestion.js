function NextQuestion({ dispatch, answer }) {
  if (answer === null) return;

  return (
    <div>
      <button
        onClick={() => dispatch({ type: 'nextQuestion' })}
        className="btn btn-ui"
      >
        Next
      </button>
    </div>
  );
}

export default NextQuestion;
