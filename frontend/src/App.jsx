import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const { isAuth, loading } = useAuth();
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={!isAuth ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!isAuth ? <Register /> : <Navigate to="/" />}
          />

          <Route
            path="/"
            element={isAuth ? <Home /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
