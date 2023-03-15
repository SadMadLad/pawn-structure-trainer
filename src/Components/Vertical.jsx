export default function Vertical({ height }) {
  const numbers = [8, 7, 6, 5, 4, 3, 2, 1];

  return (
    <span className='flex flex-col text-white' style={{ height: height, width: 25 }}>
      {numbers.map(number => <p className="flex-1 flex text-center justify-center items-center border border-chess-green border-opacity-20" key={number}>{number}</p>)}
    </span>
  );
}
