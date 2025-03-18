import SharedBoard from "@/components/shared_board/SharedBoard";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <Link
        to="v2"
        className="fixed left-2 rounded-lg bg-green-600 px-4 py-3 font-black text-white"
      >
        Version 2
      </Link>
      <SharedBoard />
    </>
  );
}
