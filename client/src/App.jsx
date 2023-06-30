import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Singup from "./pages/Singup";
import Login from "./pages/Login";
import Main from "./pages/Main";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} exact />
        <Route path="/signup" element={<Singup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
