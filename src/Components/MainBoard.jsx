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

      gameCopy.move(move)
      const pawnPositions = fetchPawnPositions(gameCopy.board())

      setGame(gameCopy)
      setPawnFen(pawnPositions)
    } catch (err) {
      console.log('Invalid Move')
    }
    return result
  }

  const popHistory = () => {
    const gameCopy = new Chess()
    gameCopy.loadPgn(game.pgn())
    gameCopy.undo()
    const pawnPositions = fetchPawnPositions(gameCopy.board())

    setGame(gameCopy);
    setPawnFen(pawnPositions)
  }

  const putMove = () => {

  }

  return (
    <div>
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5" onClick={popHistory}>Undo Move</button>
      </div>
      <button className="bg-green-500" onClick={putMove}>Put Move</button>
    </div>
  )
}
