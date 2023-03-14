import { Chessboard } from 'react-chessboard'

import Horizontal from './Horizontal'
import Vertical from './Vertical'

export default function MainBoard({ makeMove, game, width }) {
  return (
    <div>
      <Horizontal />
      <div className='flex'>
        <Vertical width={width}/>
        <div>
        <Chessboard
          id='MainBoard'
          boardWidth={width}
          onPieceDrop={makeMove}
          position={game.fen()}
          showBoardNotation={false}
        />
        </div>
        <Vertical width={width}/>
      </div>
      <Horizontal />
    </div>
  )
}
