import React, { useEffect } from "react";
import { NavBar, Footer, Input, Button } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import { useRegisterMutation } from "../store/slices/userApiSlice";
import { toast } from "react-toastify";

const Signup = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registerUser, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/app");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (data) => {
    if (data.password !== data.cpassword) return;
    try {
      const res = await registerUser({
        name: data.name,
        email: data.email,
        password: data.email,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/app");
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Something went wrong, Please try again later.");
    }
  };

  return (
    <motion.section>
      <NavBar />
      <div className="flex justify-center items-center bg-black-primary text-white h-screen overflow-y-none">
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
            <h3 className="text-3xl ml-4">Get started now! 🔥</h3>
            <p className="text-[#8C8C8C] text-sm my-2 mb-4 ml-4">
              Enter your credentials to access your account
            </p>
            <form
              className="flex flex-col gap-y-2 items-center"
              onSubmit={handleSubmit(submitHandler)}
            >
              <Input
                labelName="Name"
                placeholder="Enter your name"
                type="text"
                name="name"
                errors={errors}
                {...register("name", {
                  required: "Name is required!",
                })}
              />
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
                    message: "Password should be at least 6 characters long!",
                  },
                })}
              />
              <Input
                labelName="Confirm Password"
                placeholder="Re-enter your password"
                type="password"
                name="cpassword"
                errors={errors}
                {...register("cpassword", {
                  required: "Password is required!",
                  validate: (val) => {
                    if (watch("password") !== val) {
                      return "Your password do no match";
                    }
                  },
                })}
              />

              <Button text="Sign Up" filled full isLoading={isLoading} />
            </form>
            <p className="text-center mt-4 text-[#929292]">
              Have an account ?{" "}
              <Link to="/login" className="cursor-pointer font-bold underline">
                Login here!
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer className="xl:hidden" mobile />
    </motion.section>
  );
};

export default Signup;
