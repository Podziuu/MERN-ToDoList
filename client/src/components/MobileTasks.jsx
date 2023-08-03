import React from "react";
import { Task } from "../components";

const MobileTasks = ({ data }) => {
  return (
    <ul className="z-20 relative text-black flex flex-col justify-start items-start gap-y-8 h-full pt-8 pb-4 pl-16 max-w-full max-h-[36rem] overflow-y-scroll sm:ml-16">
      {(data &&
        data.tasks.map((task) => {
          return (
            <li key={task._id}>
              <Task id={task._id} name={task.name} checked={task.checked} />
            </li>
          );
        })) || <p>No tasks yet. Maybe add one ?</p>}
      {data && data.tasks.length === 0 ? (
        <p>No tasks yet. Maybe add one ?</p>
      ) : (
        <></>
      )}
    </ul>
  );
};

export default MobileTasks;
