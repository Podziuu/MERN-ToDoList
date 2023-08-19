import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { NavBar, Input, Button, Footer } from "../components";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../store/slices/userApiSlice";
import { toast } from "react-toastify";

const Reset = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const [searchParams, setsearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  useEffect(() => {
    if (!searchParams.get("token") || !searchParams.get("id"))
      navigate("/login");
  }, []);

  const submitHandler = async (data, e) => {
    e.preventDefault();
    try {
      const res = await resetPassword({
        password: data.password,
        userId: searchParams.get("id"),
        token: searchParams.get("token"),
      });
      if (res?.error) {
        throw new Error(res.error.data.message);
      }
      toast.success(res.message + ". You will be redirected in 3s");
    } catch (err) {
      toast.error(err?.data?.message || err.error || err.message);
    }
  };

  return (
    <motion.section>
      <NavBar />
      <div className="flex justify-center items-center bg-black-primary text-white h-screen">
        <div className="w-2/5 flex justify-center items-center sm:mb-16">
          <div>
            <h3 className="text-3xl ml-4 w-[300px] mb-2">
              Reset your password!
            </h3>

            <form
              className="flex flex-col gap-y-4 items-center w-full"
              onSubmit={handleSubmit(submitHandler)}
              noValidate
            >
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
              <Button text={"Reset"} filled full isLoading={isLoading} />
            </form>
          </div>
        </div>
      </div>
      <Footer className="" mobile />
    </motion.section>
  );
};

export default Reset;
