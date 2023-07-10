import { Route, Routes, useRoutes, useLocation } from "react-router-dom";
import { Welcome, Signup, Login, Main, Profile } from "./pages";
import { AnimatePresence } from "framer-motion";
import React from "react";

function App() {
  // const element = useRoutes([
  //   {
  //     path: "/",
  //     element: <Welcome />,
  //   },
  //   {
  //     path: "/signup",
  //     element: <Signup />,
  //   },
  //   {
  //     path: "/login",
  //     element: <Login />,
  //   },
  //   {
  //     path: "/app",
  //     element: <Main />,
  //   },
  //   {
  //     path: "/profile",
  //     element: <Profile />,
  //   },
  // ]);

  // return (
  //   <AnimatePresence mode="wait">
  //     {React.cloneElement(element, { key: location.pathname })}
  //   </AnimatePresence>
  // );

  const location = useLocation();

  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Welcome />} exact />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
