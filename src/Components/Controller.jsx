export default function Controller({ popHistory, handlePgn, controls, moves, moveBack, moveForward }) {

  return (
    <div className="bg-chess-darker h-full w-full text-white font-bold p-5 rounded">
      <p className="overflow-auto h-40 bg-chess-dark m-3 p-3 rounded" style={{width: 250}}>
        {moves}
      </p>
      <div className="flex flex-col items-center justify-center mt-5">
        <div className="flex flex-row justify-center items-center gap-6 my-2">
          <button className="bg-chess-green hover:bg-gray-700 text-white font-bold p-3 rounded" onClick={popHistory}>Undo Move</button>
          <label htmlFor="file-upload" className="bg-chess-green hover:bg-gray-700 text-white font-bold p-3 rounded">
            Upload PGN
          </label>
          <input className="hidden" id="file-upload" type="file" onChange={handlePgn} />
        </div>
        <div className="flex flex-row justify-center gap-7 my-3">
          {
            controls &&
            <>
              <button className="bg-chess-green hover:bg-gray-700 text-white font-bold p-3 rounded" onClick={moveBack}>{'<'}</button>
              <button className="bg-chess-green hover:bg-gray-700 text-white font-bold p-3 rounded" onClick={moveForward}>{'>'}</button>
            </>
          }
        </div>
      </div>
    </div>
  )
}