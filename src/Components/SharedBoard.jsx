import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

import MainBoard from "./MainBoard";
import { useState } from "react";

export default function SharedBoard() {
  const [pawnFen, setPawnFen] = useState('4k3/pppppppp/8/8/8/8/PPPPPPPP/4K3 w - - 1 1');

  const updatePawnBoard = (pawnPositions) => {
    console.log(pawnPositions);
    setPawnFen(pawnPositions);
  }

 return (<>
  <MainBoard updatePawnBoard={updatePawnBoard} />
  <br />
  <Chessboard
        id='PawnBoard'
        boardWidth={560}
        position={pawnFen}
        arePiecesDraggable={false}
      />
 </>);
}
