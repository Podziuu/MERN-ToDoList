import React from "react";
import { motion } from "framer-motion";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Menu = () => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: "40%" }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, translateY: "40%" }}
      className="bg-primary h-screen w-screen absolute z-30"
    >
      <ul className="flex flex-col justify-center items-center h-screen gap-y-8 font-bold text-2xl">
        {WEEK_DAYS.map((day) => {
          return <li key={day}>{day}</li>;
        })}
      </ul>
    </motion.div>
  );
};

export default Menu;
