import React from "react";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

const ButtonToggle = ({ onBtnClick, isActive = false, className = "" }) => {
  return (
    <button
      onClick={onBtnClick}
      className={`relative flex items-center w-16 h-7 rounded-full border-2 hover:cursor-pointer ${
        isActive ? "bg-secondary" : "bg-white"
      } ${className}`}
    >
      <div
        className={`absolute w-6 h-6 rounded-full shadow-md 
          transition-all duration-300 
          
          ${
            isActive ? "translate-x-9 bg-primary" : "translate-x-0 bg-primary"
          }`}
      ></div>
    </button>
  );
};

export default ButtonToggle;
