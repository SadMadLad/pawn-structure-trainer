import SharedBoard from "@/components/shared_board/SharedBoard";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <Link to="v2" className="bg-green-600 text-white font-black px-4 py-3 fixed left-2 rounded-lg">Version 2</Link>
      <SharedBoard />
    </>
  );
}
