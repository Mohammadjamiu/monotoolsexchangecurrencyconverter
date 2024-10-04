import React from "react";

const Navbar = () => {
  return (
    <div className="px-[20px]  h-[54px] flex justify-between items-center  bg-[#163300] shadow-md backdrop-blur-md">
      <div className="logo font-oswald font-semibold text-[22px] text-[#76b44f] flex justify-start items-center">
        <span class="material-symbols-outlined inline-block pr-1 ">
          select_all
        </span>
        <span className="text-[#9fe870]">MONO</span>TOOLS.
      </div>
      <div className="menu font-oswald font-semibold text-3xl text-[#76b44f] ">
        <span className="material-symbols-outlined ">drag_handle</span>
      </div>
    </div>
  );
};

export default Navbar;
// #163300
// #9fe870 light
