/* Main chessboard, where the original game is being played */

import { useState } from "react";

import { Chessboard } from "react-chessboard";

import Horizontal from "../Shared/Horizontal";
import Vertical from "../Shared/Vertical";
import Button from "../Shared/Button";

export default function MainBoard({
  makeMove,
  game,
  width,
  moveBack,
  moveForward,
}) {
  const [boardOrientation, setBoardOrientation] = useState(true);

  return (
    <div>
      <div className="flex justify-center items-center mb-4">
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
            id="MainBoard"
            boardWidth={width}
            onPieceDrop={makeMove}
            position={game.fen()}
            showBoardNotation={false}
            boardOrientation={boardOrientation ? "white" : "black"}
          />
        </div>
        <Vertical width={width} orientation={boardOrientation} />
      </div>
      <Horizontal orientation={boardOrientation} />
      <div className="mt-4 flex justify-center gap-2">
        <Button content={"<"} method={moveBack} />
        <Button content={">"} method={moveForward} />
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
