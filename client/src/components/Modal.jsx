import React from "react";
import Backdrop from "./Backdrop";
import { createPortal } from "react-dom";
import Input from "./Input";
import Dropdown from "./Dropdown";
import Button from './Button'
import { motion } from "framer-motion";
import RadioInput from "./RadioInput";

const ModalOverlay = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed z-50 "
    >
      <div className="">{children}</div>
    </motion.div>
  );
};

const Modal = ({ onClick, children }) => {
  return (
    <>
      {createPortal(
        <Backdrop onClick={onClick} />,
        document.getElementById("modal")
      )}
      {createPortal(
        <ModalOverlay>
          <div className="bg-[#121212] fixed h-3/5 w-4/5 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[64px] flex flex-col py-12 items-center">
            <h4 className="text-white text-3xl py-12">Add new task!</h4>
            <form className="flex flex-col gap-y-4">
              <Input labelName="Task Name" placeholder="Task Name" name="taskname" type="text" />
              <Dropdown />
              <RadioInput text="Optional Task" name="task" id="optional" checked={true} />
              <RadioInput text="Must to do Task" name="task" id="must" checked={false} />
              <Button text="Add Task" filled className="w-1/2 self-center" />
            </form>
          </div>
        </ModalOverlay>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default Modal;
