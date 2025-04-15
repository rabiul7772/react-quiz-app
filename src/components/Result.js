function Result({ points, maxPossiblePoints, dispatch, highScore }) {
  const percentage = Math.round((points / maxPossiblePoints) * 100);

  return (
    <>
      <div className="result">
        <h4>
          👨‍💻 You scored {points} out of {maxPossiblePoints} ( {percentage} % )
        </h4>
        <span className="highscore">( High score: {highScore} points )</span>
      </div>
      <button
        onClick={() => dispatch({ type: 'restart' })}
        className="btn btn-ui"
      >
        Restart Quiz
      </button>
    </>
  );
}

export default Result;
