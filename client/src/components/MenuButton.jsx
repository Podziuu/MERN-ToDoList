import React from "react";
import { motion } from "framer-motion";

const path01Variants = {
  closed: { d: "M0 6.5L23 6.5" },
  open: { d: "M2.64645 19.6464L19.6464 2.64645" },
};

const path02Variants = {
  closed: { d: "M0 11.5L23 11.5", opacity: 1, x: 0 },
  open: { opacity: 0, x: 50 },
};

const path03Variants = {
  closed: { d: "M0 16.5L23 16.5" },
  open: { d: "M2.35355 2.64645L19.35356 19.6464" },
};

const MenuButton = ({ clickHandler, isMenu }) => {
  return (
    <button onClick={clickHandler}>
      <svg
        width="23"
        height="23"
        viewBox="0 0 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          stroke="white"
          animate={isMenu ? "open" : "closed"}
          variants={path01Variants}
        />
        <motion.path
          stroke="white"
          animate={isMenu ? "open" : "closed"}
          variants={path02Variants}
        />
        <motion.path
          stroke="white"
          animate={isMenu ? "open" : "closed"}
          variants={path03Variants}
        />
      </svg>
    </button>
  );
};

export default MenuButton;
