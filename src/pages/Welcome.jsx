import React from "react";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import Footer from "../components/Footer";

const Welcome = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center min-h-screen bg-black-primary text-white">
        <h3 className="text-2xl text-center mb-4 px-8 max-w-xl">
          Take control of your time - make a task list and focus on what really
          matters!
        </h3>
        <div className="flex gap-x-4">
          <Button text="Sign Up" filled />
          <Button text="Log In" />
        </div>
      </div>
      <Footer mobile/>
    </>
  );
};

export default Welcome;
