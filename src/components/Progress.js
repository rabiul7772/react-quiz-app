function Progress({ index, numOfQ, points, maxPossiblePoints, answer }) {
  return (
    <header className="progress">
      <progress max={15} value={index + Number(answer !== null)}></progress>
      <p>
        Question <strong>{index + 1}</strong> / <strong>{numOfQ}</strong>
      </p>
      <p>
        Points <strong>{points}</strong> / <strong>{maxPossiblePoints}</strong>
      </p>
    </header>
  );
}

export default Progress;
