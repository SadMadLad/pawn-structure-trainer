import { Chessboard } from 'react-chessboard'

import Horizontal from './Horizontal'
import Vertical from './Vertical'

export default function PawnBoard({ fen, width }) {
  return (
    <div>
      <Horizontal />
      <div className='flex'>
        <Vertical width={width} />
        <div>
          <Chessboard
            id='Pawnboard'
            boardWidth={width}
            position={fen}
            arePiecesDraggable={false}
            showBoardNotation={false}
          />
        </div>
        <Vertical width={width}/>
      </div>
      <Horizontal />
    </div>
  )
}
