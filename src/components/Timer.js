import { useEffect } from 'react';

function Timer({ secondsRemaining, isRunning, status, dispatch }) {
  const minutes = Math.floor(secondsRemaining / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (secondsRemaining % 60).toString().padStart(2, '0');

  useEffect(() => {
    if (!isRunning || status !== 'active') return;

    const id = setInterval(() => dispatch({ type: 'tick' }), 1000);

    return () => clearInterval(id);
  }, [isRunning, status, dispatch]);

  return (
    <div className="timer">
      {minutes}:{seconds}
    </div>
  );
}

export default Timer;
