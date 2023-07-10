import React from "react";

const Stat = ({ title, stat, glass }) => {
  console.log(glass);
  return (
    <div
      className={` rounded-xl h-fit text-center shadow-xl ${
        glass ? "bg-white/40 border border-black py-12 px-6" : "bg-[#984EAF] px-8 py-6"
      }`}
    >
      <h4 className="text-lg">{title}</h4>
      <h3 className="text-2xl font-bold">{stat}</h3>
    </div>
  );
};

export default Stat;
