import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { useState } from 'react'

import Horizontal from './Horizontal'
import Vertical from './Vertical'

export default function MainBoard({ makeMove, game }) {

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
    </div>
  )
}
