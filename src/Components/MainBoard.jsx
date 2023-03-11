import { Chessboard } from "react-chessboard";
import { Chess } from 'chess.js';
import { useState } from "react";

export default function MainBoard() {
  const [game, setGame] = useState(new Chess());

  const pieceDrop = (sourceSquare, targetSquare) => {
    const move = {from: sourceSquare, to: targetSquare};
    let result = false;
    try {
      const gameCopy = new Chess();
      gameCopy.loadPgn(game.pgn());
      gameCopy.move(move);
      setGame(gameCopy);
      console.log(gameCopy.ascii());
      // if (moveMade) result = true;
    }
    catch (err) {
      console.log(err);
      console.log('Invalid Move');
    }
    return result;
  }

  return (
    <div>
      <Chessboard div="MainBoard" boardWidth={560} onPieceDrop={pieceDrop} position={game.fen()}/>
    </div>
  );
}
