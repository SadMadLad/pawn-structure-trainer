export default function Vertical({ height }) {
  const numbers = [8, 7, 6, 5, 4, 3, 2, 1];

  return (
    <span className='flex flex-col' style={{ height: height, width: 25 }}>
      {numbers.map(number => <p className="flex-1 flex text-center justify-center items-center" key={number}>{number}</p>)}
    </span>
  );
}
