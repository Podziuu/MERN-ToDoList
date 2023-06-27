import React from "react";
import { motion } from "framer-motion";

const Input = ({ labelName, placeholder, type, name }) => {
  return (
    <div className="flex flex-col gap-y-2">
      <label className="ml-4">{labelName}</label>
      <motion.input
        // whileHover={{
        //     border
        // }}
        className="box-content bg-transparent border border-primary rounded-xl px-4 py-2 outline-none focus:border-2 w-72 hover:ring-2 ring-primary transition"
        placeholder={placeholder}
        type={type}
        name={name}
      />
    </div>
  );
};

export default Input;
