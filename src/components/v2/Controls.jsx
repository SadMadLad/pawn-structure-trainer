import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useRef, useEffect } from "react";
import { toast } from "react-toastify";

import { downloadFile, readUploadedFile } from "@/shared/utils";
import { useGameStore } from "@/store/game_store";

export default function Controls() {
  const gameHistory = useGameStore((state) => state.gameHistory);
  const handlePgn = useGameStore((state) => state.handlePgn);
  const isPgnMode = useGameStore((state) => state.isPgnMode);
  const pgn = useGameStore((state) => state.game.pgn());
  const regex = /\d+\.\s+/g;
  const reset = useGameStore((state) => state.reset);

  const movesEndRef = useRef(null);
  const scrollToBottom = () => {
    movesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  function handlePgnUpload(e) {
    readUploadedFile(e.target.files[0], (evt) => handlePgn(evt.target.result));
  }

  useEffect(() => {
    scrollToBottom();
  }, [pgn]);

  function downloadPgn() {
    if ((pgn ?? "").trim() === "")
      return toast.error("Nothing to export!", { theme: "colored" });

    downloadFile(pgn);
  }

  return (
    <div className="flex flex-col gap-2.5">
      <button
        className="inline-flex gap-1 rounded-lg bg-gray-700 px-4 py-2.5 font-bold text-white"
        onClick={reset}
      >
        <ArrowPathIcon className="h-6 w-6" />
        <span>Reset</span>
      </button>
      <div className="inline-flex w-full gap-2">
        <label
          htmlFor="file-upload"
          className="inline-flex w-full cursor-pointer gap-1 rounded-lg bg-gray-700 px-4 py-2.5 font-bold text-white"
        >
          <ArrowUpTrayIcon className="h-6 w-6" />
          <span>Import PGN</span>
        </label>
        <input
          className="hidden"
          id="file-upload"
          type="file"
          onChange={handlePgnUpload}
        />
      </div>
      <button
        className="inline-flex gap-y-1 rounded-lg bg-gray-700 px-4 py-2.5 font-bold text-white"
        onClick={downloadPgn}
      >
        <ArrowDownTrayIcon className="h-6 w-6" />
        <span>Export PGN</span>
      </button>
      <div
        className={`grid max-h-[37.5rem] w-52 grid-cols-12 items-start gap-px overflow-auto ${(pgn ?? "").trim() !== "" && "rounded border-[0.25px] border-black"}`}
      >
        {(isPgnMode
          ? gameHistory.reduce((acc, val, index) => {
              if (index % 2 === 0) {
                acc.push([val]);
              } else {
                acc[acc.length - 1].push(val);
              }
              return acc;
            }, [])
          : pgn.split(regex).filter((part) => part !== "")
        ).map((moves, index) => {
          const [whiteMove, blackMove] = isPgnMode
            ? moves
            : moves.trim().split(" ");

          return (
            <Fragment key={index}>
              <div className="col-span-2 inline-flex h-full w-full items-center justify-center bg-stone-900 text-center font-bold text-white">
                <span>{index + 1}.</span>
              </div>
              {whiteMove && (
                <div className="col-span-5 bg-stone-800 p-2.5 font-bold text-stone-300 text-right">
                  {whiteMove}
                </div>
              )}
              {blackMove && (
                <div className="col-span-5 bg-stone-300 p-2.5 font-bold text-stone-800 text-left">
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
