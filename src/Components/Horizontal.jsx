export default function Horizontal() {
  const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

  return (
    <div className="flex px-6">
      {alphabets.map(alphabet => <p className="flex-1 text-center" key={alphabet}>{alphabet}</p>)}
    </div>
  );
}
