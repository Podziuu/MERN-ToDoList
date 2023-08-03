import React, { useEffect } from "react";
import { NavBar, Button, Footer } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/app");
    }
  }, [navigate, userInfo]);
  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center min-h-screen bg-black-primary text-white">
        <h3 className="text-2xl text-center mb-4 px-8 max-w-xl">
          Take control of your time - make a task list and focus on what really
          matters!
        </h3>
        <div className="flex gap-x-4">
          <Button text="Sign Up" filled link to="/signup" />
          <Button text="Log In" link to="login" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Welcome;
