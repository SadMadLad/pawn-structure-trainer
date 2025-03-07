/* Pawn-only board */

import { Chessboard } from "react-chessboard";

import Horizontal from "../Shared/Horizontal";
import Vertical from "../Shared/Vertical";

export default function PawnBoard({ fen, width, boardOrientation }) {
  return (
    <div>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          className="mx-6 bg-slate-600 rounded-md text-center text-white font-semibold p-2 w-full"
        />
      </div>
      <Horizontal orientation={boardOrientation} />
      <div className="flex">
        <Vertical width={width} orientation={boardOrientation} />
        <div>
          <Chessboard
            id="Pawnboard"
            boardWidth={width}
            position={fen}
            arePiecesDraggable={false}
            showBoardNotation={false}
            boardOrientation={boardOrientation ? "white" : "black"}
          />
        </div>
        <Vertical width={width} orientation={boardOrientation} />
      </div>
      <Horizontal orientation={boardOrientation} />
      <div className="flex justify-center mt-4">
        <input
          type="text"
          className="mx-6 bg-slate-600 rounded-md text-center text-white font-semibold p-2 w-full"
        />
      </div>
    </div>
  );
}
