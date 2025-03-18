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
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          className="mx-6 w-full rounded-md bg-slate-600 p-2 text-center font-semibold text-white"
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
      <div className="mt-4 flex justify-center">
        <input
          type="text"
          className="mx-6 w-full rounded-md bg-slate-600 p-2 text-center font-semibold text-white"
        />
      </div>

      <div className="my-2.5 flex items-center justify-center">
        <Button
          method={() => setBoardOrientation((orientation) => !orientation)}
          content={"Flip Board"}
        />
      </div>
    </div>
  );
}
