function StartScreen({ numOfQ, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numOfQ} questions to test your React mastery</h3>

      <button onClick={() => dispatch({ type: 'start' })} className=" btn">
        Start Quiz
      </button>
    </div>
  );
}

export default StartScreen;
