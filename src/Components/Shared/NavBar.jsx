import { setLogout } from '../../State';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setLogout());
    navigate('/');
  }

  return (
    <div className="w-full bg-chess-darker px-5 py-3 flex justify-between items-center text-white">
      <h1 className="font-black text-2xl">ACPST</h1>
      <div className="flex gap-4">
        <button className="px-4 py-1 rounded bg-chess-green hover:bg-green-800">Trainer</button>
        <button className="px-4 py-1 rounded bg-chess-green hover:bg-green-800">Blog</button>
        <button className="px-4 py-1 rounded bg-chess-green hover:bg-green-800" onClick={logout}>Sign Out</button>
      </div>
    </div>
  )
}
