import HomePage from "./Pages/HomePage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <div className="w-screen fixed top-12 left-1/2 right-1/2">
          <ToastContainer />
        </div>
      </BrowserRouter>
    </div>
  );
}
