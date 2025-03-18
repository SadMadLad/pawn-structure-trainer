/* The MainBoard and SharedBoard compiled */

import Controls from "@/components/v2/Controls";
import MainBoard from "@/components/v2/MainBoard";
import PawnBoard from "@/components/v2/PawnBoard";

export default function SharedBoard() {
  return (
    <div className="flex items-start gap-8">
      <MainBoard />
      <Controls />
      <PawnBoard />
    </div>
  );
}
