import { useEffect, useReducer } from 'react';
import Headers from './Header';
import Main from './Main';
import StartScreen from './StartScreen';
import Loader from './Loader';
import Error from './Error';
import Question from './Question';
import NextQuestion from './NextQuestion';
import Progress from './Progress';
import Finish from './Finish';
import Result from './Result';
import Timer from './Timer';

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // "loading","error", "ready","active","finished"
  status: ' loading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
  isRunning: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready'
      };

    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
        isRunning: true
      };

    case 'dataFailed':
      return { ...state, status: 'error' };

    case 'newAnswer':
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points
      };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };

    case 'finish':
      return {
        ...state,
        status: 'finish',
        highScore:
          state.points > state.highScore ? state.points : state.highScore
      };

    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
        highScore:
          state.points > state.highScore ? state.points : state.highScore
      };

    case 'tick':
      return state.secondsRemaining === 0
        ? {
            ...state,
            status: 'finish',
            highScore:
              state.points > state.highScore ? state.points : state.highScore
          }
        : { ...state, secondsRemaining: state.secondsRemaining - 1 };

    default:
      throw new Error('Action unknown');
  }
};

function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      secondsRemaining,
      isRunning,
      highScore
    },
    dispatch
  ] = useReducer(reducer, initialState);

  const numOfQ = questions.length;

  const maxPossiblePoints = questions.reduce(
    (acc, curr) => acc + curr.points,
    0
  );

  const lastQuestion = numOfQ === index + 1;
  const hasAnswered = answer !== null;

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(err => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="app">
      <Headers />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen dispatch={dispatch} numOfQ={numOfQ} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numOfQ={numOfQ}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              numOfQ={numOfQ}
              index={index}
              dispatch={dispatch}
              answer={answer}
            />

            <Timer
              isRunning={isRunning}
              status={status}
              secondsRemaining={secondsRemaining}
              dispatch={dispatch}
            />

            {lastQuestion && hasAnswered ? (
              <Finish dispatch={dispatch} />
            ) : (
              <NextQuestion dispatch={dispatch} answer={answer} />
            )}
          </>
        )}

        {status === 'finish' && (
          <Result
            highScore={highScore}
            dispatch={dispatch}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
