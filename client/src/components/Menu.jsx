import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { changeDay } from "../store/slices/ui-slice";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Menu = ({ className, setMenu }) => {
  const dispatch = useDispatch();

  const changeDayHandler = (e) => {
    dispatch(changeDay({ day: e.target.innerText }));
    setMenu(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: "40%" }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, translateY: "40%" }}
      className={`bg-primary h-screen w-screen absolute z-30 ${className}`}
    >
      <ul className="flex flex-col justify-center items-center h-screen gap-y-8 font-bold text-2xl">
        {WEEK_DAYS.map((day) => {
          return (
            <li onClick={changeDayHandler} className="cursor-pointer" key={day}>
              {day}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default Menu;
