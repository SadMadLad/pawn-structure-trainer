import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { useState } from 'react'

export default function MainBoard ({updatePawnBoard}) {
  const [game, setGame] = useState(new Chess())

  const fetchPawnPositions = (board) => {
    const pawns = {};

    board.forEach(row => {
      row.forEach(square => {
        if(square) {
          if(square.type === 'p' || square.type === 'k'){
            pawns[square.square] = `${square.color}${square.type.toUpperCase()}`
          }
        }
      })
    })
    console.log(pawns);
    return pawns;
  }

  const makeMove = (sourceSquare, targetSquare) => {
    const move = { from: sourceSquare, to: targetSquare }
    let result = false
    try {
      const gameCopy = new Chess()
      gameCopy.loadPgn(game.pgn())
      setGame(gameCopy)

      const returnedMove = gameCopy.move(move)
      const pawnPositions = fetchPawnPositions(gameCopy.board());

      console.log(returnedMove.piece)

      if(returnedMove['piece'] === 'p') updatePawnBoard(pawnPositions)
    } catch (err) {
      console.log(err)
      console.log('Invalid Move')
    }
    return result
  }

  return (
    <div>
      <Chessboard
        id='MainBoard'
        boardWidth={560}
        onPieceDrop={makeMove}
        position={game.fen()}
      />
    </div>
  )
}
