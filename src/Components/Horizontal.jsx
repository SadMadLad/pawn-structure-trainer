export default function Horizontal() {
  const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

  return (
    <div className="flex px-6 text-white">
      {alphabets.map(alphabet => <p className="flex-1 text-center border-chess-green border border-opacity-20" key={alphabet}>{alphabet}</p>)}
    </div>
  );
}
