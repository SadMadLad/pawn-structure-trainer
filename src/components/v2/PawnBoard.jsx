/* Pawn-only board */

import {
  ArrowDownTrayIcon,
  ArrowsUpDownIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import { Chessboard } from "react-chessboard";
import { useState } from "react";

import { BOARD_WIDTH } from "@/config/constants";
import { downloadFile } from "@/shared/utils";
import MainBoard from "@/components/v2/MainBoard";
import { useGameStore } from "@/store/game_store";

export default function PawnBoard() {
  const pawnFen = useGameStore((state) => state.pawnFen);

  const [boardOrientation, setBoardOrientation] = useState(true);
  const [pawnMode, setPawnMode] = useState(true);

  function copyToClipboard() {
    navigator.clipboard.writeText(pawnFen);
  }

  return (
    <div>
      {pawnMode ? (
        <div className="flex flex-col items-center gap-2.5">
          <div className="flex w-full">
            <input
              className="w-full rounded-bl-lg rounded-tl-lg border border-black border-r-transparent bg-gray-800 px-4 py-2.5 text-xs font-bold text-gray-50"
              readOnly
              value={pawnFen}
            />
            <button
              className="border border-black bg-gray-700 p-2 text-white hover:bg-gray-800"
              onClick={copyToClipboard}
            >
              <ClipboardIcon className="h-6 w-6" />
            </button>
            <button
              className="rounded-br-lg rounded-tr-lg border border-l-0 border-black bg-gray-700 p-2 text-white hover:bg-gray-800"
              onClick={() => downloadFile(pawnFen)}
            >
              <ArrowDownTrayIcon className="h-6 w-6" />
            </button>
          </div>
          <Chessboard
            id="Pawnboard"
            boardWidth={BOARD_WIDTH}
            position={pawnFen}
            arePiecesDraggable={false}
            showBoardNotation={false}
            boardOrientation={boardOrientation ? "white" : "black"}
          />
          <button
            className="inline-flex items-center gap-2.5 rounded bg-gray-700 px-4 py-2.5 text-white hover:bg-gray-800"
            onClick={() => setBoardOrientation((orientation) => !orientation)}
          >
            <ArrowsUpDownIcon className="h-6 w-6" />
            <span className="font-semibold">Flip Board</span>
          </button>
        </div>
      ) : (
        <MainBoard />
      )}
      <div className="flex items-center justify-center">
        <button
          onClick={() => setPawnMode((mode) => !mode)}
          className={`mt-4 inline-flex items-center gap-2.5 rounded bg-gray-700 px-4 py-2.5 font-semibold text-white hover:bg-gray-800 ${pawnMode ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-800"}`}
        >
          ♟️ Pawn Mode: {pawnMode ? "Yes" : "No"}
        </button>
      </div>
    </div>
  );
}
