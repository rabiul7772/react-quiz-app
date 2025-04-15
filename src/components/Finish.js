function Finish({ dispatch }) {
  return (
    <div>
      <button
        onClick={() => dispatch({ type: 'finish' })}
        className="btn btn-ui"
      >
        Finish
      </button>
    </div>
  );
}

export default Finish;
