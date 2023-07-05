import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import useWindowSize from "../hooks/useWindowSize";
import { MenuButton, Task, Menu, Modal, Button } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { changeDay } from "../store/ui-slice";

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
  {
    id: 10,
    name: "cat",
  },
  {
    id: 11,
    name: "clean",
  },
];

const Main = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const windowSize = useWindowSize();
  const day = useSelector((state) => state.ui.day);
  const dispatch = useDispatch();

  const clickHandler = (e) => {
    setIsMenu((prev) => !prev);
  };

  const modalHandler = (e) => {
    setIsModal((prev) => !prev);
  };

  const changeDayHandler = (e) => {
    dispatch(changeDay({ day: e.target.innerText }));
  };

  if (windowSize.width < 900) {
    return (
      <section className="flex bg-black-primary h-screen flex-col items-center overflow-hidden justify-between">
        <AnimatePresence>{isMenu && <Menu setMenu={setIsMenu} />}</AnimatePresence>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex justify-between items-center p-12 w-full">
            <MenuButton clickHandler={clickHandler} isMenu={isMenu} />
            <img
              className="w-12 rounded-full"
              src="https://img.freepik.com/darmowe-wektory/awatar-postaci-biznesmen-na-bialym-tle_24877-60111.jpg?w=2000"
              alt="avatar"
            />
          </div>
          <h2 className="text-4xl text-white">{day}</h2>
        </div>
        <div className="h-2/3 bg-primary w-full relative ">
          <ul className="z-20 relative text-black flex flex-col justify-start items-start gap-y-8 h-full pt-8 pb-4 pl-16 max-w-xs max-h-[85%] overflow-y-scroll sm:ml-16">
            {TASKS.map((task) => {
              return <Task key={task.id} id={task.id} name={task.name} />;
            })}
          </ul>
          <div className="absolute h-40 w-full bg-primary rounded-t-full scale-[1.5] -top-2 z-10" />
          <button
            className="absolute bottom-6 right-6 bg-secondary p-4 rounded-full"
            onClick={modalHandler}
          >
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
                fillRule="evenodd"
                d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"
              />
            </svg>
          </button>
        </div>
        <AnimatePresence>
          {isModal && <Modal onClick={modalHandler} />}
        </AnimatePresence>
      </section>
    );
  } else {
    return (
      <section className="flex">
        <div className="h-screen w-52 bg-black-primary text-white flex flex-col justify-between items-center text-center py-8 border-r border-primary">
          <h1 className="text-xl font-semibold">ToDoList App</h1>
          <ul className="text-xl gap-y-8 flex flex-col font-semibold">
            {WEEK_DAYS.map((day) => {
              return (
                <li
                  onClick={changeDayHandler}
                  key={day}
                  className="cursor-pointer"
                >
                  {day}
                </li>
              );
            })}
          </ul>
          <div />
        </div>
        <div className="bg-gradient-login bg-cover h-screen w-full">
          <div className="w-full h-1/5 bg-black-primary border-b border-primary flex justify-between items-center p-16">
            <h3 className="text-4xl text-white">{day}</h3>
            <Button
              onClick={modalHandler}
              filled
              text="Add Task"
              className="w-fit"
            />
            <img
              className="w-24 rounded-full"
              src="https://img.freepik.com/darmowe-wektory/awatar-postaci-biznesmen-na-bialym-tle_24877-60111.jpg?w=2000"
              alt="avatar"
            />
          </div>
          <div className="w-full h-4/5 flex justify-around items-start">
            <div className="h-4/5 text-center">
              <h4 className="text-3xl my-6 font-bold">Optional Tasks</h4>
              <div className="h-full w-[350px] lg:w-[400px] bg-white/40 border border-black shadow-xl relative flex items-center">
                <ul className="flex flex-col justify-center relative items-center max-h-[85%] gap-y-6 p-16 overflow-y-scroll">
                  {TASKS.map((task) => {
                    return <Task key={task.id} id={task.id} name={task.name} />;
                  })}
                </ul>
              </div>
            </div>
            <div className="h-4/5 text-center">
              <h4 className="text-3xl my-6 font-bold">Must to do Tasks</h4>
              <div className="h-full w-[350px] lg:w-[400px] bg-white/40 border border-black shadow-xl relative flex items-center">
                <ul className="flex flex-col justify-center relative items-center max-h-[85%] gap-y-6 p-16 overflow-y-scroll">
                  {TASKS.map((task) => {
                    return <Task key={task.id} id={task.id} name={task.name} />;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isModal && <Modal onClick={modalHandler} />}
        </AnimatePresence>
      </section>
    );
  }
};

export default Main;
