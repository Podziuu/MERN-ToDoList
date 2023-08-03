import React from "react";
import { Task } from "../components";

const DesktopTasks = ({ data, type }) => {
  return (
    <ul className="flex flex-col justify-center relative items-start max-h-[85%] gap-y-6 p-16 overflow-y-scroll">
      {(data &&
        data.tasks
          .filter((task) => task.type === type)
          .map((task, i) => {
            return (
              <li key={task._id}>
                <Task id={task._id} name={task.name} checked={task.checked} />
              </li>
            );
          })) || <p>No tasks yet. Maybe add one ?</p>}
      {data.tasks.filter((task) => task.type === type).length === 0 ? (
        <p>No tasks yet. Maybe add one ?</p>
      ) : (
        <></>
      )}
    </ul>
  );
};

export default DesktopTasks;
