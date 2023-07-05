import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  {
    name: "Sports",
    icon: "⚽",
  },
  {
    name: "School",
    icon: "📕",
  },
  {
    name: "Work",
    icon: "💼",
  },
  {
    name: "House",
    icon: "🏠",
  },
  {
    name: "Money",
    icon: "💸",
  },
];

const Dropdown = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [category, setCategory] = useState('Category')
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current?.contains(e.target)) {
        setIsMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const clickHandler = () => {
    setIsMenu((prev) => !prev);
  };

  const categoryHandler = (e) => {
    setCategory(e.target.innerText)
  };

  return (
    <div className="flex flex-col gap-y-2 relative">
      <h4 className="ml-4 text-white">Category</h4>
      <div
        onClick={clickHandler}
        ref={dropdownRef}
        className="box-content bg-transparent border border-primary rounded-xl px-4 py-2 outline-none focus:border-2 w-64 hover:ring-2 ring-primary transition text-[#9CA3AF] flex justify-between items-center"
      >
        <h4 className={`${category === 'category' ? '' : 'text-white'}`}>{category}</h4>
        <svg
          fill="#9CA3AF"
          height="18px"
          width="18px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 330 330"
          xmlSpace="preserve"
          className={`${isMenu ? "rotate-180" : ""} duration-100`}
        >
          <path
            id="XMLID_225_"
            d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
          />
        </svg>
      </div>
      <AnimatePresence>
        {isMenu && (
          <motion.div
            initial={{ opacity: 0, translateY: "-50%" }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: "-10%" }}
            className="absolute bg-black-primary w-full top-20 rounded-xl p-2 border-primary border text-white z-20"
          >
            <ul className="gap-y-1 flex flex-col">
              {CATEGORIES.map((cat, i) => {
                return (
                  <li
                    key={i}
                    className="flex justify-between hover:bg-primary duration-75 rounded-xl p-2"
                    onClick={categoryHandler}
                    value={cat.name}
                  >
                    <span>{cat.name}</span>
                    <span>{cat.icon}</span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
