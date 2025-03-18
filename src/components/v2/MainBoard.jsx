/* Main chessboard, where the original game is being played */

import {
  ArrowDownTrayIcon,
  ArrowsUpDownIcon,
  ArrowTurnDownLeftIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import { Chessboard } from "react-chessboard";
import { useState } from "react";

import { BOARD_WIDTH } from "@/config/constants";
import { downloadFile } from "@/shared/utils";
import { useGameStore } from "@/store/game_store";

export default function MainBoard() {
  const gameFen = useGameStore((state) => state.gameFen);
  const onPieceDrop = useGameStore((state) => state.onPieceDrop);
  const moveBack = useGameStore((state) => state.moveBack);

  const [boardOrientation, setBoardOrientation] = useState(true);

  function copyToClipboard() {
    navigator.clipboard.writeText(gameFen);
  }

  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="flex w-full">
        <input
          className="w-full rounded-bl-lg rounded-tl-lg border border-black border-r-transparent bg-gray-800 px-4 py-2.5 text-xs font-bold text-gray-50"
          readOnly
          value={gameFen}
        />
        <button
          className="border border-black bg-gray-700 p-2 text-white hover:bg-gray-800"
          onClick={copyToClipboard}
        >
          <ClipboardIcon className="h-6 w-6" />
        </button>
        <button
          className="rounded-br-lg rounded-tr-lg border border-l-0 border-black bg-gray-700 p-2 text-white hover:bg-gray-800"
          onClick={() => downloadFile(gameFen)}
        >
          <ArrowDownTrayIcon className="h-6 w-6" />
        </button>
      </div>
      <Chessboard
        id="MainBoard"
        boardWidth={BOARD_WIDTH}
        onPieceDrop={onPieceDrop}
        position={gameFen}
        showBoardNotation={false}
        boardOrientation={boardOrientation ? "white" : "black"}
      />
      <div className="flex flex-col items-center gap-2.5">
        <button
          className="inline-flex items-center gap-2.5 rounded bg-gray-700 px-4 py-2.5 text-white hover:bg-gray-800"
          onClick={() => setBoardOrientation((orientation) => !orientation)}
        >
          <ArrowsUpDownIcon className="h-6 w-6" />
          <span className="font-semibold">Flip Board</span>
        </button>
        <button
          onClick={() => moveBack()}
          className="inline-flex items-center gap-2.5 rounded bg-gray-700 px-4 py-2.5 font-semibold text-white hover:bg-gray-800"
        >
          <ArrowTurnDownLeftIcon className="h-6 w-6" />
          <span>Back</span>
        </button>
      </div>
    </div>
  );
}
