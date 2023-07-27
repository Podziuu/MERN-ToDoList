import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Spinner } from "../components";

const Button = ({
  text,
  filled,
  onClick,
  link,
  to,
  className,
  full,
  isLoading,
}) => {
  const classes = filled
    ? "bg-primary text-white"
    : "bg-transparent text-primary border border-primary";

  const width = full ? "w-full" : "w-32";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`${classes} px-8 py-2 rounded-2xl drop-shadow-xl drop-shadow-primary ${width} ${className} flex items-center justify-center`}
      onClick={onClick}
    >
      {link ? (
        <Link to={to}>{text}</Link>
      ) : (
        <span>{isLoading ? <Spinner /> : text}</span>
      )}
    </motion.button>
  );
};

export default Button;
