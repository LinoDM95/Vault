import React from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const ButtonSuccess = ({ buttonName = "Success", onBtnClick }) => {
  /**
   * @param buttonName: Name of the button
   * @param img: Image if needed
   * @param onBtnClick: Add functionality
   */

  return (
    <div>
      <button
        className="group flex items-center gap-2 px-4 py-2 rounded-full text-white bg-gradient-to-r from-[#7AE582] to-[#1F6B45] hover:brightness-75 transition-all duration-300"
        onClick={onBtnClick}
      >
        <IoIosCheckmarkCircleOutline size={20} />

        {buttonName}
      </button>
    </div>
  );
};
export default ButtonSuccess;
