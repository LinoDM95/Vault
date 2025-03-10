import React from "react";
import { MdDeleteOutline, MdDeleteForever } from "react-icons/md";

const ButtonDelete = ({ buttonName = "", onBtnClick }) => {
  /**
   * @param buttonName: Name of the button
   * @param onBtnClick: Add functionality
   */

  return (
    <div>
      <button
        className="group flex items-center gap-2  p-2 rounded-full text-primary bg-gradient-to-r from-secondary to-outline-ui
 hover:brightness-75 transition-all duration-300 cursor-pointer"
        onClick={onBtnClick}
      >

        {buttonName}
      </button>
    </div>
  );
};
export default ButtonDelete;
