import React, { useRef, useState } from "react";
import { useCheckTaskMutation } from "../store/slices/taskApiSlice";

const Task = ({ id, name, className, checked }) => {
  const [isChecked, setIsChecked] = useState(checked);
  const checkBoxRef = useRef();

  const [check] = useCheckTaskMutation();

  const clickHandler = async () => {
    setIsChecked((prev) => !prev);
    await check(id);
  };

  return (
    <div className={` group flex items-center ${className}`}>
      <input
        className="!w-6 !h-6 rounded-full absolute opacity-0 z-20 peer"
        type="checkbox"
        id={id}
        //ref={checkBoxRef}
        onChange={clickHandler}
        checked={isChecked}
      />
      <div className="!w-8 !h-8 bg-transparent border-2 border-black rounded-full hidden peer-checked:flex peer-checked:border-[#984EAF] justify-center items-center group-hover:scale-[1.1] transition">
        <svg
          width="36px"
          height="36px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Interface / Check">
            <path
              id="Vector"
              d="M6 12L10.2426 16.2426L18.727 7.75732"
              stroke="#984EAF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
      <div className="!w-8 !h-8 bg-transparent border-2 border-black rounded-full peer-checked:hidden group-hover:scale-[1.1] transition shrink-0" />
      <label
        className="ml-12 text-lg peer-checked:text-[#505050] peer-checked:line-through group-hover:scale-[1.05] transition"
        htmlFor={id}
      >
        {name}
      </label>
    </div>
  );
};

export default Task;

{
  /* <div className={`w-48 group flex items-center ${className}`}>
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
    </div> */
}
