import React from "react";

const MobileMenu = ({ modalHandler, menuHandler }) => {
  return (
    <div className="absolute inset-0 z-40" onClick={menuHandler}>
      <div className="absolute right-24 bottom-4 flex flex-col gap-y-4">
        <div
          className="self-end bg-[#700094] p-1 px-2 rounded pointer-events-auto cursor-pointer"
          onClick={modalHandler}
        >
          Add Tasks
        </div>
        <div className=" bg-[#700094] p-1 px-2 w-fit rounded cursor-pointer">
          Delete Tasks
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

{
  /* <div className="absolute inset-0 z-40" onClick={menuHandler}>
      <div className="absolute w-[230px] h-[200px] bottom-0 right-0 grid grid-cols-2 grid-rows-2 justify-end pointer-events-none">
        <div
          className="col-span-2 self-end justify-self-end text-center mr-4 bg-[#700094] p-1 px-2 rounded pointer-events-auto"
          onClick={modalHandler}
        >
          Add Tasks
        </div>
        <div className="self-center justify-self-end bg-[#700094] p-1 px-2 w-fit rounded">
          Delete Tasks
        </div>
      </div>
    </div> */
}
