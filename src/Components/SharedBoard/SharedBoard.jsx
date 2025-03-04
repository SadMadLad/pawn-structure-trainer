/* The MainBoard and SharedBoard compiled */

import { useState, useEffect } from "react";
import { Chess } from "chess.js";

import MainBoard from "./MainBoard";
import PawnBoard from "./PawnBoard";
import Controller from "./Controller";
import Button from "../Shared/Button";
import { toast } from "react-toastify";

const WIDTH = 400;
const fileReader = new FileReader();

export default function SharedBoard() {
  const [pawnFen, setPawnFen] = useState(
    "8/pppppppp/8/8/8/8/PPPPPPPP/8 w - - 1 1",
  );
  const [game, setGame] = useState(new Chess());
  const [movesDisplay, setMovesDisplay] = useState([]);
  const [boardOrientation, setBoardOrientation] = useState(true); // true => white, false => black
  const [freeMode, setFreeMode] = useState(false);
  const [invertMode, setInvertMode] = useState(false);

  // PGN related states
  const [counter, setCounter] = useState(0);
  const [pgnMoves, setPgnMoves] = useState([]);
  const [controls, setControls] = useState(false);
  const [gameName, setGameName] = useState("");

  // Core Methods
  const fetchPawnPositions = (board) => {
    const pawns = {};

    board.forEach((row) => {
      row.forEach((square) => {
        if (square) {
          if (square.type === "p") {
            pawns[square.square] =
              `${square.color}${square.type.toUpperCase()}`;
          }
        }
      });
    });
    return pawns;
  };

  useEffect(() => {
    resetHandler();
  }, [freeMode]);

  const updateBoard = (
    move = false,
    undo = false,
    pgn = false,
    reset = false,
  ) => {
    const gameCopy = new Chess();

    if (!reset) gameCopy.loadPgn(game.pgn());
    if (move) {
      if (freeMode) {
        const pieceToMove = gameCopy.get(move.from);
        const pieceAtSquare = gameCopy.get(move.to);

        if (pieceAtSquare.type !== "k") {
          gameCopy.remove(move.from);
          gameCopy.put(
            { type: pieceToMove.type, color: pieceToMove.color },
            move.to,
          );
        }
      } else {
        gameCopy.move(move);
      }
    }
    if (undo) gameCopy.undo();

    if (pgn) {
      if (pgn === "forward" && counter < pgnMoves.length) {
        setCounter((counter) => counter + 1);
        updateBoard(pgnMoves[counter], false, false);
      } else if (pgn === "back" && counter > 0) {
        setCounter((counter) => counter - 1);
        updateBoard(false, true, false);
      }

      return;
    }

    const pawnPositions = fetchPawnPositions(gameCopy.board());

    setGame(gameCopy);
    setPawnFen(pawnPositions);

    const moves = gameCopy.pgn();
    const splittedMoves = moves.split(/\d+\./).slice(1);
    const withIndex = splittedMoves.map(
      (move, index) => `${index + 1}.${move}`,
    );
    setMovesDisplay(withIndex);
  };

  // Board State Methods
  const makeMove = (sourceSquare, targetSquare) => {
    const move = { from: sourceSquare, to: targetSquare };
    try {
      updateBoard(move);
    } catch (err) {
      console.log(err);
      toast("Invalid Move");
      console.log("Invalid Move");
    }
  };

  const popHistory = () => updateBoard(false, true);

  // PGN file controls
  const handlePgn = (e) => {
    resetHandler();
    const pgn = e.target.files[0];

    fileReader.readAsText(pgn, "UTF-8");
    fileReader.onload = function (evt) {
      setControls(true);
      let chessFile = evt.target.result;
      let kingCastlesReplaced = chessFile.replaceAll("0-0", "O-O");
      let queenCastlesReplaced = kingCastlesReplaced.replaceAll(
        "0-0-0",
        "O-O-O",
      );

      const pgnGame = new Chess();
      pgnGame.loadPgn(queenCastlesReplaced);

      const gameHeader = pgnGame.header();
      const newGame = pgnGame.history();

      setControls(true);
      setPgnMoves(newGame);
      setGameName(
        `${gameHeader.White} - ${gameHeader.Black}: ${gameHeader.Date.substring(0, 4)}`,
      );
      updateBoard(false, false, false, true);
    };
    document.getElementById("file-upload").value = "";
  };

  const moveForward = () => updateBoard(false, false, "forward");
  const moveBack = () => {
    if (controls) {
      updateBoard(false, false, "back");
    } else {
      popHistory();
    }
  };

  /* Button Functions */

  // Reset Everything
  const resetHandler = () => {
    setPawnFen("8/pppppppp/8/8/8/8/PPPPPPPP/8 w - - 1 1");
    setGame(new Chess());
    setMovesDisplay([]);
    setCounter(0);
    setPgnMoves([]);
    setControls(false);
  };

  const completeReset = () => {
    resetHandler();
    document.getElementById("file-upload").value = "";
  };

  return (
    <div className="flex flex-col sm:flex-row justify-around items-center mt-5">
      <div className="flex justify-center gap-5">
        <MainBoard
          game={game}
          makeMove={makeMove}
          width={WIDTH}
          boardOrientation={boardOrientation}
          controls={controls}
          moveBack={moveBack}
          moveForward={moveForward}
          gameName={gameName}
        />
        <div className="flex-grow-0 flex-auto h-5/6">
          <Controller moves={movesDisplay} />
          <div className="mt-4 flex flex-col items-center gap-2">
            <div className="flex flex-wrap gap-2 mt-8">
              <label
                htmlFor="file-upload"
                className="bg-gray-700 hover:bg-gray-900 text-white font-bold p-3 rounded"
              >
                Upload PGN
              </label>
              <input
                className="hidden"
                id="file-upload"
                type="file"
                onChange={handlePgn}
              />
              <Button method={completeReset} content={"Reset"} />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className={`${freeMode ? "bg-green-600 hover:bg-green-800" : "bg-gray-700 hover:bg-gray-900"} text-white font-bold p-3 rounded`}
                onClick={() => setFreeMode((mode) => !mode)}
              >
                Free Mode: {freeMode ? "ON" : "OFF"}
              </button>
              <Button
                method={() => setBoardOrientation((notation) => !notation)}
                content={"Flip Board"}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className={`${invertMode ? "bg-green-600 hover:bg-green-800" : "bg-gray-700 hover:bg-gray-900"} text-white font-bold p-3 rounded`}
                onClick={() => setInvertMode((mode) => !mode)}
              >
                Invert Mode: {invertMode ? "ON" : "OFF"}
              </button>
            </div>
          </div>
        </div>
        {invertMode ? (
          <MainBoard
            game={game}
            makeMove={makeMove}
            width={WIDTH}
            boardOrientation={!boardOrientation}
            controls={controls}
            moveBack={moveBack}
            moveForward={moveForward}
            gameName={gameName}
          />
        ) : (
          <PawnBoard
            fen={pawnFen}
            width={WIDTH}
            boardOrientation={boardOrientation}
          />
        )}
      </div>
    </div>
  );
}
