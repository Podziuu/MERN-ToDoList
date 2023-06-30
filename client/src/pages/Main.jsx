import React, { useState } from "react";
import MenuButton from "../components/MenuButton";
import Task from "../components/Task";
import Menu from "../components/Menu";
import { AnimatePresence } from "framer-motion";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const TASKS = [
  {
    id: 1,
    name: "School",
  },
  {
    id: 2,
    name: "Workout",
  },
  {
    id: 3,
    name: "Lunch",
  },
  {
    id: 4,
    name: "Dishes",
  },
  {
    id: 5,
    name: "Mathematic",
  },
  {
    id: 6,
    name: "Physics",
  },
  {
    id: 7,
    name: "gdsagsdagsdaga sdgsgdsags dagdsagdsagds",
  },
  {
    id: 8,
    name: "JAcka",
  },
  {
    id: 9,
    name: "dog",
  },
];

const Main = () => {
  const [isMenu, setIsMenu] = useState(false);

  const clickHandler = (e) => {
    setIsMenu((prev) => !prev);
  };
  return (
    <section className="flex bg-black-primary h-screen flex-col items-center overflow-hidden justify-between">
      <AnimatePresence>{isMenu && <Menu />}</AnimatePresence>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex justify-between items-center p-12 w-full">
          <MenuButton clickHandler={clickHandler} isMenu={isMenu} />
          <img
            className="w-12 rounded-full"
            src="https://img.freepik.com/darmowe-wektory/awatar-postaci-biznesmen-na-bialym-tle_24877-60111.jpg?w=2000"
            alt="avatar"
          />
        </div>
        <h2 className="text-4xl text-white">Monday</h2>
      </div>
      <div className="h-2/3 bg-primary w-full relative ">
        <ul className="z-20 relative text-black flex flex-col justify-start items-start gap-y-8 h-full pt-8 pb-4 pl-16 max-w-xs max-h-[85%] overflow-y-scroll">
          {TASKS.map((task) => {
            return <Task key={task.id} id={task.id} name={task.name} />;
          })}
        </ul>
        <div className="absolute h-40 w-full bg-primary rounded-t-full scale-[1.5] -top-2 z-10" />
        <button className="absolute bottom-6 right-6 bg-secondary p-4 rounded-full">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="relative"
          >
            <path
              fill="#000000"
              fill-rule="evenodd"
              d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"
            />
          </svg>
        </button>
      </div>
      {/* <div className="h-screen w-52 bg-black text-white flex flex-col justify-between items-center text-center py-8 border-r border-primary">
        <h1 className="text-xl font-semibold">ToDoList App</h1>
        <ul className="text-xl gap-y-8 flex flex-col font-semibold">
          {WEEK_DAYS.map((day) => {
            return <li key={day} className="cursor-pointer">{day}</li>;
          })}
        </ul>
        <div />
      </div>
      <div className="bg-red-500 h-screen w-full"></div> */}
    </section>
  );
};

export default Main;
