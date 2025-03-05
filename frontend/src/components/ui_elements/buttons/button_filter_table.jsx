import React, { useState } from "react";

const TableBtnFilter = ({ buttons = [], onBtnClick }) => {
  /**
 * ! This button handles an array of objects wich contains the button titles and if needed icons for the buttons
 * ! IMPORTANT!
 * ! This API deletes an item using the ID in the API URL. 
 * ! If you need to use a different method, such as JSON, you will need to implement it here.
 * 
 * @param onBtnClick returns the title of the button as an string
 * 
 * ? Object example:
 * ? [{title: "Button1", icon: icon}, {etc.}]
 */

  const [active, setActive] = useState(null);

  const checkButtonClick = (title) => {
    const newActive = active === title ? null : title;
    setActive(newActive);
    onBtnClick(newActive);
  };

  return (
    <div className="flex">
      {buttons.map((btn, index) => (
        <button
          key={index}
          className={`px-4 py-2 mx-2 my-6 space-x-2 rounded-full border flex items-center font-semibold 
            ${
              active === btn.title
                ? "border-2 border-blue-900 bg-blue-100"
                : "border-gray-300 hover:bg-gray-300 transition-all duration-300"
            }`}
          onClick={() => checkButtonClick(btn.title)}
        >
          {btn.icon && (
            <img src={btn.icon} alt={btn.title} className="w-6 h-6" />
          )}
          <span>{btn.title}</span>
        </button>
      ))}
    </div>
  );
};
export default TableBtnFilter;
