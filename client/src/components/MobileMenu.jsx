import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const MobileMenu = ({ modalHandler, menuHandler, deleteHandler }) => {
  return (
    <div className="absolute inset-0 z-40" onClick={menuHandler}>
      <AnimatePresence>
        <motion.div
          animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
          initial={{ scale: 0, opacity: 0, x: "200%", y: "50%" }}
          exit={{ scale: 0, opacity: 0, x: "200%", y: "50%" }}
          className="absolute right-24 bottom-4 flex flex-col gap-y-4"
        >
          <div
            className="self-end bg-[#700094] p-1 px-2 rounded pointer-events-auto cursor-pointer"
            onClick={modalHandler}
          >
            Add Tasks
          </div>
          <div
            onClick={deleteHandler}
            className=" bg-[#700094] p-1 px-2 w-fit rounded cursor-pointer"
          >
            Delete Tasks
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
