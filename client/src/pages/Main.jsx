import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useWindowSize from "../hooks/useWindowSize";
import {
  MenuButton,
  Menu,
  Modal,
  Button,
  MobileTasks,
  DesktopTasks,
  MobileMenu,
} from "../components";
import { useSelector, useDispatch } from "react-redux";
import { changeDay } from "../store/slices/ui-slice";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { useLogoutMutation } from "../store/slices/userApiSlice";
import {
  useGetDayTasksQuery,
  useDeleteTasksMutation,
} from "../store/slices/taskApiSlice";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Main = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isMenu2, setIsMenu2] = useState(false);
  const windowSize = useWindowSize();
  const day = useSelector((state) => state.ui.day);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading } = useGetDayTasksQuery(day);
  const [deleteTasks, { isLoading: loadingDelete }] = useDeleteTasksMutation();

  const [logoutUser] = useLogoutMutation();

  const clickHandler = (e) => {
    setIsMenu((prev) => !prev);
  };

  const menuHandler = () => {
    setIsMenu2((prev) => !prev);
  };

  const modalHandler = (e) => {
    setIsModal((prev) => !prev);
  };

  const changeDayHandler = (e) => {
    dispatch(changeDay({ day: e.target.innerText }));
  };

  const logoutHandler = async () => {
    await logoutUser();
    dispatch(logout());
    navigate("/login");
  };

  const deleteHandler = async () => {
    try {
      await deleteTasks({ day });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (windowSize.width < 900) {
    return (
      <motion.section className="flex bg-black-primary h-screen flex-col items-center overflow-hidden justify-between">
        <AnimatePresence>
          {isMenu && <Menu setMenu={setIsMenu} />}
        </AnimatePresence>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex justify-between items-center p-12 w-full">
            <MenuButton clickHandler={clickHandler} isMenu={isMenu} />
            <Link to="/profile">
              <img
                className="w-12 rounded-full"
                src="https://img.freepik.com/darmowe-wektory/awatar-postaci-biznesmen-na-bialym-tle_24877-60111.jpg?w=2000"
                alt="avatar"
              />
            </Link>
          </div>
          <h2 className="text-4xl text-white">{day}</h2>
        </div>
        <div className="h-2/3 bg-primary w-full relative ">
          {!isLoading && <MobileTasks data={data} />}
          <div className="absolute h-40 w-full bg-primary rounded-t-full scale-[1.5] -top-2 z-10" />
          <button
            className="absolute bottom-6 right-6 bg-secondary p-4 rounded-full z-20"
            onClick={menuHandler}
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
        {isMenu2 && <MobileMenu modalHandler={modalHandler} menuHandler={menuHandler} />}
      </motion.section>
    );
  } else {
    return (
      <motion.section className="flex">
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
          <Button text="Logout" filled onClick={logoutHandler} />
        </div>
        <div className="bg-gradient-login bg-cover h-screen w-full">
          <div className="w-full h-1/5 bg-black-primary border-b border-primary flex justify-between items-center p-16 md:p-8">
            <h3 className="text-4xl text-white">{day}</h3>
            <div className="flex gap-x-2 md:gap-x-4 lg:gap-x-8 xl:gap-x-16">
              <Button
                onClick={modalHandler}
                filled
                text="Add Task"
                className="w-fit"
              />
              <Button
                filled
                text="Delete Completed Tasks"
                className="w-fit"
                onClick={deleteHandler}
                isLoading={loadingDelete}
              />
            </div>
            <Link to="/profile">
              <img
                className="w-24 rounded-full"
                src="https://img.freepik.com/darmowe-wektory/awatar-postaci-biznesmen-na-bialym-tle_24877-60111.jpg?w=2000"
                alt="avatar"
              />
            </Link>
          </div>
          <div className="w-full h-4/5 flex justify-around items-start">
            <div className="h-4/5 text-center">
              <h4 className="text-3xl my-6 font-bold">Must to do Tasks</h4>
              <div className="h-full w-[350px] lg:w-[400px] xl:w-[565px] bg-white/40 border border-black shadow-xl relative flex items-start">
                {!isLoading && <DesktopTasks data={data} type="Must" />}
              </div>
            </div>
            <div className="h-4/5 text-center">
              <h4 className="text-3xl my-6 font-bold">Optional Tasks</h4>
              <div className="h-full w-[350px] lg:w-[400px] xl:w-[565px] bg-white/40 border border-black shadow-xl relative flex items-start">
                {!isLoading && <DesktopTasks data={data} type="Optional" />}
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isModal && <Modal onClick={modalHandler} />}
        </AnimatePresence>
      </motion.section>
    );
  }
};

export default Main;
