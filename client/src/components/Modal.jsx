import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import {
  Backdrop,
  Input,
  Dropdown,
  Button,
  RadioInput,
  ModalOverlay,
} from "../components";
import { useForm } from "react-hook-form";
import { useAddTaskMutation } from "../store/slices/taskApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Modal = ({ onClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [category, setCategory] = useState("Category");
  const [categoryError, setCategoryError] = useState(null);

  const day = useSelector((state) => state.ui.day);

  const [addTask, { isLoading }] = useAddTaskMutation();

  const submitHandler = async (data, e) => {
    e.preventDefault();
    if (category === "Category")
      return setCategoryError("Please select category!");
    const cat = category.split("\n")[0];
    // send to database
    try {
      const res = await addTask({
        name: data.taskName,
        category: cat,
        day,
        type: data.type,
      });
      if (!isLoading) {
        onClick();
      }
      if (res?.error) {
        throw new Error(res.error.data.message);
      }
      toast.success("You successfully add new task!");
    } catch (err) {
      toast.error(err?.data?.message || err.error || err.message);
    }
  };
  return (
    <>
      {createPortal(
        <Backdrop onClick={onClick} />,
        document.getElementById("modal")
      )}
      {createPortal(
        <ModalOverlay>
          <div className="bg-[#121212] fixed h-fit w-4/5 max-w-xl top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[64px] flex flex-col py-12 items-center">
            <h4 className="text-white text-3xl py-12">Add new task!</h4>
            <form
              className="flex flex-col gap-y-4"
              onSubmit={handleSubmit(submitHandler)}
              noValidate
            >
              <Input
                labelName="Task Name"
                placeholder="Task Name"
                name="taskname"
                type="text"
                errors={errors}
                {...register("taskName", {
                  required: "Task name is required!",
                })}
              />
              <Dropdown
                category={category}
                setCategory={setCategory}
                errors={categoryError}
                setCategoryError={setCategoryError}
              />
              <RadioInput
                text="Must to do Task"
                name="task"
                id="must"
                checked={true}
                value="Must"
                {...register("type")}
              />
              <RadioInput
                text="Optional Task"
                name="task"
                id="optional"
                checked={false}
                value="Optional"
                {...register("type")}
              />
              <Button
                text="Add Task"
                filled
                className="self-center w-fit md:w-full mt-2"
                isLoading={isLoading}
              />
            </form>
          </div>
        </ModalOverlay>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default Modal;
