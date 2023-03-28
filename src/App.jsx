import HomePage from "./Pages/HomePage"
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/SignUpPage"

import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"

export default function App() {
  const isAuthenticated = true && useSelector(state => state.token);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <RegisterPage />} />
          <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
