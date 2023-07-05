import React from "react";
import { motion } from "framer-motion";

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      className="bg-black/70 fixed inset-0 z-40 flex justify-center items-center"
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
