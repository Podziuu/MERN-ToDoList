import React from "react";
import { NavBar, Footer } from "../components";

const NotFound = () => {
  return (
    <div className="bg-black-primary w-screen h-screen">
      <NavBar />
      <div className="flex justify-center items-center w-full h-full text-white text-4xl">
        <h3>Page Not Found</h3>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
