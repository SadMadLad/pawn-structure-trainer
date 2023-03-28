export default function NavBar() {
  return (
    <div className="fixed w-full bg-chess-darker px-5 py-4 flex justify-between items-center text-white">
      <h1 className="font-black text-2xl">ACPST</h1>
      <div className="flex gap-4">
        <button className="px-4 py-1 rounded bg-chess-green hover:bg-green-800">Login</button>
        <button className="px-4 py-1 rounded bg-chess-green hover:bg-green-800">Sign Up</button>
      </div>
    </div>
  )
}
