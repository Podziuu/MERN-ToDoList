import React from "react";
import { NavBar, Footer, Input, Button } from "../components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

const Singup = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    console.log(data);
  };

  return (
    <motion.section>
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
            <h3 className="text-3xl ml-4">Welcome back! 👋</h3>
            <p className="text-[#8C8C8C] text-sm my-2 mb-4 ml-4">
              Enter your credentials to access your account
            </p>
            <form
              className="flex flex-col gap-y-4 items-center w-full"
              onSubmit={handleSubmit(submitHandler)}
              noValidate
            >
              <Input
                labelName="Email"
                placeholder="Enter your email"
                type="email"
                name="email"
                errors={errors}
                {...register("email", {
                  required: "Email is required!",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid email address",
                  },
                })}
              />
              <Input
                labelName="Password"
                placeholder="Enter your password"
                type="password"
                name="password"
                errors={errors}
                {...register("password", {
                  required: "Password is required!",
                  minLength: {
                    value: 6,
                    message: "Password should be min 6 characters long!",
                  },
                })}
              />
              <Button text="Log In" filled full />
              <div className="flex justify-between w-full px-4 text-sm">
                <div className="flex justify-center items-center gap-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    {...register("remember")}
                    className="peer p-1 cursor-pointer border-white/30 relative h-5 w-5 shrink-0 appearance-none rounded-sm border after:absolute after:left-0 after:top-0 after:h-full after:w-full checked:after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content-[''] checked:bg-primary hover:ring-2 hover:ring-secondary focus:outline-none"
                  />
                  <label
                    htmlFor="remember"
                    className="w-full cursor-pointer font-medium text-white/80"
                  >
                    Remember me
                  </label>
                </div>
                <p className="text-[#8C8C8C] cursor-pointer">
                  Forgot password?
                </p>
              </div>
            </form>
            <p className="text-center mt-4 text-[#929292]">
              Don't have an account ?{" "}
              <Link to="/signup" className="cursor-pointer font-bold underline">
                Signup here!
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer className="xl:hidden" mobile />
    </motion.section>
  );
};

export default Singup;
