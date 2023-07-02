import React, { useRef, useState } from "react";

const RadioInput = ({ name, text, id, checked }) => {
  const [isChecked, setIsChecked] = useState(checked);
  const inputRef = useRef();

  //   if(checked) {
  //     inputRef.current.checked = true;
  //   }

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    console.log(isChecked);
    console.log(e.target.checked);
  };

  return (
    <div className=" ml-4 flex items-center">
      <input
        type="radio"
        name={name}
        id={id}
        ref={inputRef}
        onChange={handleChange}
        className="peer absolute w-8 h-8 opacity-0"
        checked={isChecked}
      />
      <div className="w-8 h-8 bg-transparent border-2 border-black rounded-full hidden peer-checked:flex peer-checked:border-[#3C91E6] justify-center items-center">
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
              stroke="#3C91E6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
      <div className="w-8 h-8 bg-transparent border-2 border-black rounded-full  peer-checked:hidden" />
      <label htmlFor={id} className="text-white text-lg ml-6">
        {text}
      </label>
    </div>
  );
};

export default RadioInput;
