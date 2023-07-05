import React from "react";
import { motion } from "framer-motion";

const Input = ({ labelName, placeholder, type, name }) => {
  return (
    <div className="flex flex-col gap-y-2">
      <label className="ml-4 text-white">{labelName}</label>
      <motion.input
        className="box-content bg-transparent border border-primary rounded-xl px-4 py-2 outline-none focus:ring-2 w-64 hover:ring-2 ring-primary transition text-white"
        placeholder={placeholder}
        type={type}
        name={name}
      />
    </div>
  );
};

export default Input;
