import { useState } from "react";
import { Chess } from "chess.js";

import MainBoard from "./MainBoard";
import PawnBoard from "./PawnBoard";

export default function SharedBoard() {
  const [pawnFen, setPawnFen] = useState('8/pppppppp/8/8/8/8/PPPPPPPP/8 w - - 1 1');
  const [game, setGame] = useState(new Chess())

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

  const updateBoard = (move = false, undo = false) => {
    const gameCopy = new Chess()
    gameCopy.loadPgn(game.pgn())
    if (move) { gameCopy.move(move) }
    if (undo) { gameCopy.undo() }

    const pawnPositions = fetchPawnPositions(gameCopy.board())

    setGame(gameCopy)
    setPawnFen(pawnPositions)
  }

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

  return (
    <>
      <div className="py-5 flex flex-col sm:flex-row">
        <div>
          <MainBoard game={game} makeMove={makeMove} />
          <div className='flex justify-center items-center my-2'>
            <button className="bg-gray-400 hover:bg-gray-700 text-white font-bold px-5 py-4 ml-20 rounded" onClick={popHistory}>Undo Move</button>
          </div>
        </div>
        <div className="pl-5">
          <PawnBoard fen={pawnFen} />
        </div>
      </div>
    </>
  );
}
