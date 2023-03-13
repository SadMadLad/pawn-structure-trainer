import { Chessboard } from 'react-chessboard'

import Horizontal from './Horizontal'
import Vertical from './Vertical'

export default function PawnBoard({ fen }) {
  return (
    <div>
      <Horizontal />
      <div className='flex'>
        <Vertical />
        <div>
          <Chessboard
            id='Pawnboard'
            boardWidth={500}
            position={fen}
            arePiecesDraggable={false}
            showBoardNotation={false}
          />
        </div>
        <Vertical />
      </div>
      <Horizontal />
    </div>
  )
}
