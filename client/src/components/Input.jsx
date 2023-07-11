import React from "react";
import { motion } from "framer-motion";

const Input = React.forwardRef(
  ({ labelName, placeholder, type, name, errors, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-y-1 w-min">
        <label className="ml-4 text-white">{labelName}</label>
        <motion.input
          className="box-content bg-transparent border border-primary rounded-xl px-4 py-2 outline-none focus:ring-2 w-64 hover:ring-2 ring-primary transition text-white"
          placeholder={placeholder}
          type={type}
          name={name}
          {...rest}
          ref={ref}
        />
        {errors && (
          <span className="ml-4 pt-1 text-red-500 flex flex-wrap">
            {errors[name]?.message}
          </span>
        )}
      </div>
    );
  }
);

export default Input;
