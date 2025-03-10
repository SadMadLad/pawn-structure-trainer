/* Pawn-only board */

import { Chessboard } from "react-chessboard";
import { useState } from "react";

import Horizontal from "@/components/shared/Horizontal";
import Vertical from "@/components/shared/Vertical";
import Button from "@/components/shared/Button";

export default function PawnBoard({ fen, width }) {
  const [boardOrientation, setBoardOrientation] = useState(true);

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

      <div className="flex items-center justify-center my-2.5">
        <Button
          method={() => setBoardOrientation((orientation) => !orientation)}
          content={"Flip Board"}
        />
      </div>
    </div>
  );
}
