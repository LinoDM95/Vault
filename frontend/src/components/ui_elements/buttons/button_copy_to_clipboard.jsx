import React from "react";
import { FaRegCopy, FaCopy } from "react-icons/fa6";

const ButtonCopyToClipboard = ({ buttonName = "Copy", text, onBtnClick }) => {
  /**
   * ! This button handles an array of objects wich contains the button titles and if needed icons for the buttons
   * ! IMPORTANT!
   * ! This API deletes an item using the ID in the API URL.
   * ! If you need to use a different method, such as JSON, you will need to implement it here.
   *
   * @param onBtnClick Save the text into the clipboard
   * @param text Text you wanna save
   * @param buttonName Button name
   *
   */

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Copy went wrong", err);
    }
  };

  return (
    <div>
      <button
        className="group flex items-center gap-2 px-4 py-2 rounded-full text-white bg-gradient-to-r from-[#0F6CBD] to-blue-900 hover:brightness-75 transition-all duration-300 cursor-pointer"
        onClick={() => {
          copyText(), onBtnClick();
        }}
      >
        <FaRegCopy
          size={20}
          className="group-hover:hidden transition-all duration-300"
        />
        <FaCopy
          size={20}
          className="hidden group-hover:inline transition-all duration-300"
        />
        {buttonName}
      </button>
    </div>
  );
};
export default ButtonCopyToClipboard;
