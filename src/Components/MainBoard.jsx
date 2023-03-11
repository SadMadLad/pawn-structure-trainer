import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'

import { useState } from 'react'

export default function MainBoard({ setPawnFen }) {
  const [game, setGame] = useState(new Chess())

  const fetchPawnPositions = board => {
    const pawns = {}

    board.forEach(row => {
      row.forEach(square => {
        if (square) {
          if (square.type === 'p' || square.type === 'k') {
            pawns[square.square] = `${square.color}${square.type.toUpperCase()}`
          }
        }
      })
    })
    return pawns
  }

  const makeMove = (sourceSquare, targetSquare) => {
    const move = { from: sourceSquare, to: targetSquare }
    let result = false
    try {
      const gameCopy = new Chess()
      gameCopy.loadPgn(game.pgn())
      setGame(gameCopy)

      gameCopy.move(move)
      const pawnPositions = fetchPawnPositions(gameCopy.board())

      setPawnFen(pawnPositions)
    } catch (err) {
      console.log('Invalid Move')
    }
    return result
  }

  return (
    <div>
      <p className="text-2xl font-semibold text-center m-4">Play your move on this board</p>
      <Chessboard
        id='MainBoard'
        boardWidth={500}
        onPieceDrop={makeMove}
        position={game.fen()}
      />
    </div>
  )
}
