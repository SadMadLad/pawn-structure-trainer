import SharedBoard from "../Components/SharedBoard/SharedBoard";
import { setLogout } from "../State";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setLogout());
    navigate('/');
  }

  return (
    <>
      <button className="bg-chess-green" onClick={logout}>Logout</button>
      <SharedBoard />
    </>
  );
}

