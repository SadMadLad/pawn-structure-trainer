import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { useState } from 'react'

import Horizontal from './Horizontal'
import Vertical from './Vertical'

export default function MainBoard({ setPawnFen }) {
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
    <div>
      <Horizontal />
      <div className='flex'>
        <Chessboard
          id='MainBoard'
          boardWidth={500}
          onPieceDrop={makeMove}
          position={game.fen()}
          showBoardNotation={false}
        />
        <Vertical />
      </div>
      <Horizontal />
      <div className='flex justify-center items-center'>
        <button className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded my-5" onClick={popHistory}>Undo Move</button>
      </div>
    </div>
  )
}
