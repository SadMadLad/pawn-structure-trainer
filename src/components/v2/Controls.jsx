import { ArrowDownTrayIcon, ArrowPathIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { Fragment, useRef, useEffect } from "react";
import { toast } from "react-toastify";

import { downloadFile } from "@/shared/utils";
import { useGameStore } from "@/store/game_store";

export default function Controls() {
  const pgn = useGameStore((state) => state.game.pgn());
  const regex = /\d+\.\s+/g;
  const reset = useGameStore((state) => state.reset);

  const movesEndRef = useRef(null);
  const scrollToBottom = () => {
    movesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [pgn]);

  function downloadPgn() {
    if ((pgn ?? "").trim() === "") return toast.error("Nothing to export!", { theme: "colored" });

    downloadFile(pgn)
  }

  return (
    <div className="flex flex-col gap-2.5">
      <button className="inline-flex gap-1 rounded-lg bg-gray-700 px-4 py-2.5 font-bold text-white" onClick={reset}>
        <ArrowPathIcon className="h-6 w-6" />
        <span>Reset</span>
      </button>
      <button className="inline-flex gap-1 rounded-lg bg-gray-700 px-4 py-2.5 font-bold text-white">
        <ArrowUpTrayIcon className="h-6 w-6" />
        <span>Import PGN</span>
      </button>
      <button className="inline-flex gap-1 rounded-lg bg-gray-700 px-4 py-2.5 font-bold text-white" onClick={downloadPgn}>
        <ArrowDownTrayIcon className="h-6 w-6" />
        <span>Export PGN</span>
      </button>
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
