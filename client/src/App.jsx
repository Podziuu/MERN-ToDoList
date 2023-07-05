import { Route, Routes } from "react-router-dom";
import { Welcome, Signup, Login, Main } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} exact />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
