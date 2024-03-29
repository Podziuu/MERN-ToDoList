import { Route, Routes, useRoutes, useLocation } from "react-router-dom";
import {
  Welcome,
  Signup,
  Login,
  Main,
  Profile,
  NotFound,
  Reset,
} from "./pages";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./utils/PrivateRoute";
import React from "react";

function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence>
        <ToastContainer className="mt-24" />
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Welcome />} exact />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/app" element={<Main />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/reset" element={<Reset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
