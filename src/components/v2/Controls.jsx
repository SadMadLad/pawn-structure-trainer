import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Fragment, useRef, useEffect } from "react";

import { downloadFile } from "@/shared/utils";
import { useGameStore } from "@/store/game_store";

export default function Controls() {
  const pgn = useGameStore((state) => state.game.pgn());
  const regex = /\d+\.\s+/g;

  const movesEndRef = useRef(null);
  const scrollToBottom = () => {
    movesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [pgn]);

  return (
    <div className="flex flex-col gap-2.5">
      {(pgn ?? "").trim() && (
        <button className="inline-flex gap-1 rounded-lg bg-gray-700 px-4 py-2.5 font-bold text-white" onClick={() => downloadFile(pgn)}>
          <ArrowDownTrayIcon className="h-6 w-6" />
          <span>Export PGN</span>
        </button>
      )}
      <div
        className={`grid max-h-[37.5rem] min-w-40 grid-cols-2 items-start gap-0.5 overflow-auto ${(pgn ?? "").trim() !== "" && "rounded border-[0.25px] border-black"}`}
      >
        {pgn
          .split(regex)
          .filter((part) => part !== "")
          .map((moves, index) => {
            const [whiteMove, blackMove] = moves.trim().split(" ");

            return (
              <Fragment key={index}>
                {whiteMove && (
                  <div className="bg-stone-700 p-2.5 font-bold text-white">
                    {whiteMove}
                  </div>
                )}
                {blackMove && (
                  <div className="bg-stone-500 p-2.5 font-bold text-black">
                    {blackMove}
                  </div>
                )}
              </Fragment>
            );
          })}
        <span ref={movesEndRef}></span>
      </div>
    </div>
  );
}
