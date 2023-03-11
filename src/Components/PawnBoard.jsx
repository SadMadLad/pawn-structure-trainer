import { Chessboard } from 'react-chessboard'

export default function PawnBoard({ fen }) {
  return (
    <div>
      <p className="text-2xl font-semibold text-center m-4">And the pawn structure will be reflected here</p>
      <Chessboard
        id='Pawnboard'
        boardWidth={500}
        position={fen}
        arePiecesDraggable={false}
      />
    </div>

  )
}
