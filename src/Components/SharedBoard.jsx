import { useState } from "react";
import { Chess } from "chess.js";

import MainBoard from "./MainBoard";
import PawnBoard from "./PawnBoard";

export default function SharedBoard() {
  const [pawnFen, setPawnFen] = useState('8/pppppppp/8/8/8/8/PPPPPPPP/8 w - - 1 1');
  const [game, setGame] = useState(new Chess())

  // Core Methods
  const fetchPawnPositions = board => {
    const pawns = {}

    board.forEach(row => {
      row.forEach(square => {
        if (square) {
          if (square.type === 'p') {
            pawns[square.square] = `${square.color}${square.type.toUpperCase()}`
          }
        }
      })
    })
    return pawns
  }

  const updateBoard = (move = false, undo = false, pgn = false) => {
    const gameCopy = new Chess()
    gameCopy.loadPgn(game.pgn())
    if (move) { gameCopy.move(move) }
    if (undo) { gameCopy.undo() }
    if (pgn)  {
      gameCopy.loadPgn(pgn)
    }

    const pawnPositions = fetchPawnPositions(gameCopy.board())

    setGame(gameCopy)
    setPawnFen(pawnPositions)
  }

  // Board State Methods
  const makeMove = (sourceSquare, targetSquare) => {
    const move = { from: sourceSquare, to: targetSquare }
    try {
      updateBoard(move);
    } catch (err) {
      console.log(err)
      console.log('Invalid Move')
    }
  }

  const popHistory = () => {
    updateBoard(false, true);
  }

  const handlePgn = (e) => {
    const fileReader = new FileReader();
    const pgn = e.target.files[0];

    fileReader.readAsText(pgn, 'UTF-8')
    fileReader.onload = function(evt) {
      updateBoard(false, false, evt.target.result);
    }
  }

  return (
    <div className="py-5 flex flex-col sm:flex-row justify-around">
      <div>
        <MainBoard game={game} makeMove={makeMove} />
        <div className='flex justify-center items-center my-2'>
          <button className="bg-gray-400 hover:bg-gray-700 text-white font-bold px-5 py-4 rounded" onClick={popHistory}>Undo Move</button>
          <label htmlFor="file-upload" className="bg-green-500 hover:bg-green-900 text-white font-bold px-5 py-4 rounded mx-5">
            Upload PGN
          </label>
          <input className="hidden" id="file-upload" type="file" onChange={handlePgn}/>
        </div>
      </div>
      <PawnBoard fen={pawnFen} />
    </div>
  );
}
