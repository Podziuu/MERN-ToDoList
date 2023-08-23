import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useWindowSize from "../hooks/useWindowSize";
import {
  MenuButton,
  Task,
  Menu,
  Modal,
  Button,
  Stat,
  Spinner,
} from "../components";
import { useSelector, useDispatch } from "react-redux";
import { changeDay } from "../store/slices/ui-slice";
import { Link } from "react-router-dom";
import { useGetStatsQuery } from "../store/slices/userApiSlice";
import { useGetAllTasksQuery } from "../store/slices/taskApiSlice";

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

const Profile = () => {
  const [isStats, setIsStats] = useState(false);
  const windowSize = useWindowSize();

  const { name } = useSelector((state) => state.auth.userInfo);

  console.log(name);

  const { data } = useGetStatsQuery();
  const { data: tasks } = useGetAllTasksQuery();
  console.log(tasks);

  console.log(data);

  const clickHandler = (e) => {
    if (e.target.innerText === "Stats") {
      setIsStats(true);
    } else {
      setIsStats(false);
    }
  };
  if (windowSize.width < 900) {
    return (
      <motion.section className="flex bg-black-primary h-screen flex-col items-center overflow-hidden justify-between">
        <div className="flex flex-col justify-start items-start w-full h-1/3 mt-8 ml-12">
          <Link to="/app">
            <svg
              fill="white"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              className="rotate-180 cursor-pointer"
            >
              <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
            </svg>
          </Link>
        </div>
        <div className="h-2/3 bg-primary w-full relative flex flex-col items-center">
          <img
            className="w-28 rounded-full z-20 absolute -top-24 "
            src="https://img.freepik.com/darmowe-wektory/awatar-postaci-biznesmen-na-bialym-tle_24877-60111.jpg?w=2000"
            alt="avatar"
          />
          <h5 className="relative z-20 mt-8 text-xl font-semibold">{name}</h5>
          <div className="absolute h-40 w-full bg-primary rounded-t-full scale-[1.5] -top-2 z-10"></div>
          <div className="text-black mt-16 z-20 flex justify-between w-full px-12 text-xl">
            <div
              onClick={clickHandler}
              className={`border-black pb-1 pr-6 ${
                isStats ? "border-b-2" : "border-b-4 "
              } cursor-pointer transition`}
            >
              All Tasks
            </div>
            <div
              onClick={clickHandler}
              className={`border-b-2 border-black pb-1 pl-6 ${
                isStats ? "border-b-4" : "border-b-2"
              } cursor-pointer transition`}
            >
              Stats
            </div>
          </div>
          <div
            className={`${
              isStats ? "self-center justify-self-center" : "self-start"
            } mt-8`}
          >
            {!isStats && (
              <ul className="z-20 relative text-black flex flex-col justify-start items-start gap-y-8 h-full pt-8  pl-24 pb-4 max-w-xs max-h-96 overflow-y-scroll sm:ml-16">
                {tasks &&
                  tasks.tasks.map((task, i) => {
                    return (
                      <li key={i}>
                        <Task
                          key={task._id}
                          id={task._id}
                          name={task.name}
                          checked={task.checked}
                        />
                      </li>
                    );
                  })}
              </ul>
            )}
            {isStats && data && (
              <div className="grid h-full w-full grid-cols-2 gap-8 sm:gap-x-36">
                <Stat stat={`${data.dayStreak} days 🔥`} title="Day Streak" />
                <Stat
                  stat={data.mostFrequentCategory || "Add Tasks"}
                  title="Fav Category"
                />
                <Stat
                  stat={data.completedTasks || "Complete Tasks"}
                  title="Completed Tasks"
                />
                <Stat
                  stat={data.onGoingTasks || "Add Tasks"}
                  title="On-Going Tasks"
                />
                <Stat
                  stat={data.mostFrequentDay || "Add Tasks"}
                  title="Most Active Day"
                />
                <Stat
                  stat={`${data.completionPercentage || "Add Tasks"} %`}
                  title="Completion tasks"
                />
              </div>
            )}
            {isStats && !data && <Spinner />}
          </div>
        </div>
      </motion.section>
    );
  } else {
    return (
      <section className="flex">
        <div className="h-screen w-52 bg-black-primary text-white flex flex-col justify-between items-center text-center py-8 border-r border-primary">
          <h1 className="text-xl font-semibold">ToDoList App</h1>
          <Link to="/app" className="flex gap-x-2">
            <svg
              fill="white"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              className="rotate-180 cursor-pointer"
            >
              <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
            </svg>
            Go Back
          </Link>
        </div>
        <div className="bg-gradient-login bg-cover h-screen w-full">
          <div className="w-full h-1/5 bg-black-primary border-b border-primary flex justify-between items-center p-16 relative">
            <div to="/profile" className="absolute top-32 text-center">
              <img
                className="w-28 rounded-full mb-2 peer relative cursor-pointer"
                src="https://img.freepik.com/darmowe-wektory/awatar-postaci-biznesmen-na-bialym-tle_24877-60111.jpg?w=2000"
                alt="avatar"
              />
              <div className="w-28 bg-black/60 h-28 absolute top-0 rounded-full justify-center items-center text-white text-xs hidden peer-hover:flex cursor-pointer z-10">
                Change Photo
              </div>
              <span className="text-2xl font-bold">{name}</span>
            </div>
          </div>
          <div className="w-full h-4/5 flex items-center justify-center">
            {data && (
              <div className="grid h-full w-full grid-cols-3 gap-16 gap-y-36 mx-6 xl:mx-36 place-content-center">
                <Stat
                  stat={`${data.dayStreak} days 🔥`}
                  title="Day Streak"
                  glass
                />
                <Stat
                  stat={data.mostFrequentCategory || "Add Tasks"}
                  title="Fav Category"
                  glass
                />
                <Stat
                  stat={data.completedTasks || "Complete Tasks"}
                  title="Completed Tasks"
                  glass
                />
                <Stat
                  stat={data.onGoingTasks || "Add Tasks"}
                  title="On-Going Tasks"
                  glass
                />
                <Stat
                  stat={data.mostFrequentDay || "Add Tasks"}
                  title="Most Active Day"
                  glass
                />
                <Stat
                  stat={`${data.completionPercentage || "Add Tasks"} %`}
                  title="Completion tasks"
                  glass
                />
              </div>
            )}
            {!data && <Spinner />}
            {/* <div className="h-4/5 text-center">
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
            </div> */}
          </div>
        </div>
      </section>
    );
  }
};

export default Profile;
