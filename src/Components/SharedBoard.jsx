import { useState } from "react";

import MainBoard from "./MainBoard";
import PawnBoard from "./PawnBoard";

export default function SharedBoard() {
  const [pawnFen, setPawnFen] = useState('4k3/pppppppp/8/8/8/8/PPPPPPPP/4K3 w - - 1 1');

  return (
    <div className="flex flex-col sm:flex-row justify-around">
      <MainBoard setPawnFen={setPawnFen} />
      <br />
      <PawnBoard fen={pawnFen} />
    </div>
  );
}
