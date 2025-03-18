/* The panel in the center to display the moves of the game */

import { useEffect, useRef } from "react";

export default function Controller({ moves }) {
  const movesEndRef = useRef(null);
  const scrollToBottom = () => {
    movesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [moves]);

  return (
    <div className="mt-6 h-full w-full rounded border-4 border-red-500 bg-chess-darker p-5 font-bold text-white">
      <p
        className="flex h-full flex-col overflow-auto rounded bg-chess-dark"
        style={{ width: 250, height: 400 }}
      >
        {moves.map((move, index) => (
          <span className="text-center" key={index}>
            {move}
          </span>
        ))}
        <span ref={movesEndRef}></span>
      </p>
    </div>
  );
}
