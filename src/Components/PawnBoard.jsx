import { Chessboard } from 'react-chessboard'

export default function PawnBoard ({ fen }) {
  return (
    <Chessboard
      id='Pawnboard'
      boardWidth={560}
      position={fen}
      arePiecesDraggable={false}
    />
  )
}
