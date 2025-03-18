import HomePage from "@/pages/HomePage";
import OtherPage from "@/pages/OtherPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/other-page" element={<OtherPage />} />
        </Routes>
        <div className="fixed left-1/2 right-1/2 top-12 w-screen">
          <ToastContainer />
        </div>
      </BrowserRouter>
    </div>
  );
}
