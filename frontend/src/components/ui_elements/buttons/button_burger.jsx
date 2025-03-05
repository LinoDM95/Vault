import React from "react";


const ButtonBurger = ({ onBtnClick, className = "", }) => {
      /**
   * @param buttonName: Name of the button
   * @param onBtnClick: Add functionality
   */

  return (
    <div>
      <button
        className={`font-bold text-text-on-primary transition-all duration-300 cursor-pointer ${className}`}
        onClick={onBtnClick}
      >
        Menu
      </button>
    </div>
  );
};
export default ButtonBurger;




