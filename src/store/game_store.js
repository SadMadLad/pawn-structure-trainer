import { create } from "zustand";
import { Chess } from "chess.js";

const useGameStore = create((set, get) => ({
  // The whole chess game
  game: new Chess(),

  // Fen Position of the game
  gameFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",

  // Pawn Fen Positions
  pawnFen: "8/pppppppp/8/8/8/8/PPPPPPPP/8",

  // Game Moves
  gameHistory: [],

  // Move Back
  moveBack: () => {
    const move = get().game.undo();

    if (move) {
      set({ gameFen: get().game.fen() });
      get().pawnPositions();
    }
  },

  // Get the fen positions of the pawn
  pawnPositions: () => {
    const fen = get().game.fen();

    const parts = fen.split(" ");
    if (parts.length < 1) {
      return null;
    }

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

    return true;
  },

  // Reset the board
  reset: () =>
    set({
      game: new Chess(),
      gameFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      pawnFen: "8/pppppppp/8/8/8/8/PPPPPPPP/8",
    }),
}));

export { useGameStore };
