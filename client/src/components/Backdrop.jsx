import React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Input from "./Input";

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      //onAbort={onClick}
      //onBlur={onClick}
      // onDrop={onClick}
      className="bg-black/70 fixed inset-0 z-40 flex justify-center items-center"
    >
      {/* <div className="h-3/5 w-4/5 bg-[#121212] rounded-[12%] flex items-center flex-col z-50">
        <h4 className="text-white">Add new task!</h4>
        <form>
            <Input/>
        </form>
      </div> */}
      {children}
    </motion.div>
  );
};

export default Backdrop;
