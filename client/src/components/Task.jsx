import React, { useRef, useState } from "react";
import { useCheckTaskMutation } from "../store/slices/taskApiSlice";

const Task = ({ id, name, className, checked }) => {
  const [isChecked, setIsChecked] = useState(checked);
  const checkBoxRef = useRef();

  const [check] = useCheckTaskMutation();

  const clickHandler = async () => {
    // console.log(checkBoxRef.current.checked);
    console.log(id);
    setIsChecked((prev) => !prev);
    await check(id);
  };

  return (
    <div className={`w-48 group flex items-center ${className}`}>
      <input
        className="w-6 h-6 rounded-full absolute mr-4 opacity-0 z-20 peer"
        type="checkbox"
        id={id}
        //ref={checkBoxRef}
        onChange={clickHandler}
        checked={isChecked}
      />
      <div className="w-8 h-8 mr-8 bg-transparent absolute rounded-full border border-black hover:ring hover:ring-purple-600 z-10 transition group-hover:scale-110  group-hover:ring group-hover:ring-purple-600 peer-checked:bg-black peer-checked:shadow-checkbox" />
      <label
        className="ml-12 text-lg peer-checked:text-[#505050] peer-checked:line-through"
        htmlFor={id}
      >
        {name}
      </label>
    </div>
  );
};

export default Task;
