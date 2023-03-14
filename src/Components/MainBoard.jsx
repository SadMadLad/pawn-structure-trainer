import { Chessboard } from 'react-chessboard'

import Horizontal from './Horizontal'
import Vertical from './Vertical'

export default function MainBoard({ makeMove, game }) {
  return (
    <div>
      <Horizontal />
      <div className='flex'>
        <Vertical />
        <div>
        <Chessboard
          id='MainBoard'
          boardWidth={500}
          onPieceDrop={makeMove}
          position={game.fen()}
          showBoardNotation={false}
        />
        </div>
        <Vertical />
      </div>
      <Horizontal />
    </div>
  )
}
