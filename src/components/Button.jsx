import React from "react";
import { motion } from "framer-motion";

const Button = ({ text, filled }) => {
  const classes = filled
    ? "bg-primary text-white"
    : "bg-transparent text-primary border border-primary";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`${classes} px-8 py-2 rounded-2xl drop-shadow-xl drop-shadow-primary`}
    >
      {text}
    </motion.button>
  );
};

export default Button;
