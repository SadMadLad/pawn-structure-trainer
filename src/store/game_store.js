import { create } from "zustand";
import { Chess } from "chess.js";
import { toast } from "react-toastify";

const useGameStore = create((set, get) => ({
  // The whole chess game
  game: new Chess(),

  // Fen Position of the game
  gameFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",

  // Pawn Fen Positions
  pawnFen: "8/pppppppp/8/8/8/8/PPPPPPPP/8",

  // Is currently a PGN file being used
  isPgnMode: false,

  // Game Moves
  gameHistory: [],

  // Move Back
  moveBack: () => {
    const move = get().game.undo();

    if (move) {
      set({ gameFen: get().game.fen() });
      get().pawnPositions();
    }

    if (get().isPgnMode) {
      const historyCopy = get().gameHistory;
      historyCopy.pop();

      set({ gameHistory: historyCopy });
    }
  },

  // Handle PGN Upload
  handlePgn: (pgnFileData) => {
    try {
      const newGame = new Chess();

      let kingCastlesReplaced = pgnFileData.replaceAll("0-0", "O-O");
      let queenCastlesReplaced = kingCastlesReplaced.replaceAll(
        "0-0-0",
        "O-O-O",
      );

      newGame.loadPgn(queenCastlesReplaced);

      set({
        game: newGame,
        gameFen: newGame.fen(),
        gameHistory: newGame.history(),
        isPgnMode: true,
      });
      get().pawnPositions();
    } catch {
      toast.error("Could Not Import PGN!", { theme: "colored" });
    }
  },

  // Get the fen positions of the pawn
  pawnPositions: () => {
    const fen = get().game.fen();

    const parts = fen.split(" ");
    if (parts.length < 1) return null;

    const boardRows = parts[0].split("/");
    const pawnRows = [];

    for (const row of boardRows) {
      let pawnRow = "";
      let emptyCount = 0;

      for (const char of row) {
        if (char.toLowerCase() === "p") {
          if (emptyCount > 0) {
            pawnRow += emptyCount;
            emptyCount = 0;
          }
          pawnRow += char;
        } else if (char >= "1" && char <= "8") {
          emptyCount += parseInt(char);
        } else {
          emptyCount++;
        }
      }
      if (emptyCount > 0) {
        pawnRow += emptyCount;
      }

      pawnRows.push(pawnRow);
    }

    const pawnFen = pawnRows.join("/");
    set({ pawnFen });
  },

  // When a piece is moved on the board
  onPieceDrop: (sourceSquare, targetSquare) => {
    const move = get().game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false;

    set({ gameFen: get().game.fen() });
    get().pawnPositions();

    if (get().isPgnMode) {
      const historyCopy = get().gameHistory;
      historyCopy.push(move.san);

      set({ gameHistory: historyCopy });
    }

    return true;
  },

  // Reset the board
  reset: () =>
    set({
      game: new Chess(),
      gameFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      pawnFen: "8/pppppppp/8/8/8/8/PPPPPPPP/8",
      isPgnMode: false,
      gameHistory: [],
    }),
}));

export { useGameStore };
