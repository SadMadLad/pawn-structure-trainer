/* Labels from to A to H horizontally for the chessboard */

export default function Horizontal({ orientation }) {
  const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const flexType = orientation ? "flex-row" : "flex-row-reverse";
  const className = `flex ${flexType} px-6 text-white`;

  return (
    <div className={className}>
      {alphabets.map((alphabet) => (
        <p
          className="flex-1 border border-chess-green border-opacity-20 text-center"
          key={alphabet}
        >
          {alphabet}
        </p>
      ))}
    </div>
  );
}
