import { Chessboard } from 'react-chessboard'

import Horizontal from './Horizontal'
import Vertical from './Vertical'

export default function PawnBoard({ fen }) {
  return (
    <div>
      <div className='flex'>
        <Chessboard
          id='Pawnboard'
          boardWidth={500}
          position={fen}
          arePiecesDraggable={false}
        />
        <Vertical />
      </div>
      <Horizontal />
    </div>

  )
}
