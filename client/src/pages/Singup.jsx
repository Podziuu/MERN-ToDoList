import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Singup = () => {
  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center bg-black-primary text-white h-screen">
        <div className="hidden xl:flex w-3/5 h-full relative bg-gradient-login bg-cover justify-center items-center">
          <div className="w-2/3 h-2/3 bg-white bg-opacity-30 backdrop-blur-lg drop-shadow-lg z-50 text-black 2xl:p-24 p-12 flex flex-col justify-center">
            <h2 className="3xl:text-7xl xl:text-6xl w-fit inline">
              Maximize your{" "}
              <span className="text-[#93008A] font-bold">efficiency</span> and{" "}
              <span className="text-[#93008A] font-bold">success</span> with our
              productivity app!
            </h2>
            <p className="mt-12 text-2xl text-black/60">
              Don't waste time, <br /> sign up and become more productive!
            </p>
          </div>
        </div>
        <div className="w-2/5 flex justify-center items-center sm:mb-16">
          <div>
            <h3 className="text-3xl ml-4">Get started now!</h3>
            <p className="text-[#8C8C8C] text-sm my-2 mb-4 ml-4">
              Enter your credentials to access your account
            </p>
            <form className="flex flex-col gap-y-4 items-center">
              <Input
                labelName="Name"
                placeholder="Enter your name"
                type="text"
                name="name"
              />
              <Input
                labelName="Email"
                placeholder="Enter your email"
                type="email"
                name="email"
              />
              <Input
                labelName="Password"
                placeholder="Enter your password"
                type="password"
                name="password"
              />
              <Input
                labelName="Confirm Password"
                placeholder="Re-enter your password"
                type="password"
                name="cpassword"
              />

              <Button text="Sign Up" filled full />
            </form>
            <p className="text-center mt-4 text-[#929292]">
              Have an account ? <Link to="/login" className="cursor-pointer font-bold underline">Login here!</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer className="xl:hidden" mobile />
    </>
  );
};

export default Singup;
