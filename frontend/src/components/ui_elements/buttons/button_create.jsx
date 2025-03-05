import React from "react";
import { IoAdd } from "react-icons/io5";

const ButtonCreate = ({ buttonName = "Create", onBtnClick }) => {
      /**
   * @param buttonName: Name of the button
   * @param onBtnClick: Add functionality
   */

  return (
    <div>
      <button
        className="group flex items-center gap-2 px-4 py-2 rounded-full text-white bg-gradient-to-r from-[#0F6CBD] to-blue-900 hover:brightness-75 transition-all duration-300"
        onClick={onBtnClick}
      >
        <IoAdd
          size={24}
          className="text-white transition-transform duration-300 group-hover:rotate-90"
        />
        {buttonName}
      </button>
    </div>
  );
};
export default ButtonCreate;
