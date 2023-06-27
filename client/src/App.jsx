import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Singup from "./pages/Singup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} exact />
        <Route path="/signup" element={<Singup />} />
      </Routes>
    </>
  );
}

export default App;
