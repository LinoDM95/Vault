import React from "react";
import ButtonBrand from "../buttons/button_brand";
const CardSnippetShowCase = ({
  title = "This is an title example",
  user,
  description = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam qui sapiente porro illum voluptatum eos doloremque minus voluptates rem inventore quasi repudiandae, quam numquam quos enim error sequi laboriosam iste.",
  language = "Example Language",
  onBtnClick,
}) => {

  return (
    <div className="relative flex flex-col my-6 bg-white rounded-lg w-96">
      <div className="flex relative h-56 m-2.5 overflow-hidden text-black rounded-full items-center justify-center ">
        <h1 className="font-bold border-1 rounded-full p-30 text-2xl">
          {user}
        </h1>
      </div>
      <div className="p-4">
        <h6 className="text-slate-800 text-xl font-bold ">
          {title.length > 30 ? title.slice(0, 30) + "..." : title}
        </h6>
        <div className="flex items-center mb-4">
          <p className="text-secondary font-semibold">{language}</p>
          {/* 
          <div className="flex items-center gap-1.5 ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-red-600"
            >
              <path
                fillRule="evenodd"
                d="M11.998 4.684C9.31 1.756 4.917 2.076 2.641 5.1c-1.81 2.37-1.54 5.701.705 7.987l6.958 6.89a2.251 2.251 0 0 0 3.184 0l6.958-6.89c2.245-2.286 2.515-5.617.705-7.987-2.276-3.024-6.669-3.344-9.357-.416z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-slate-600 ml-1.5">{rating}</span>
          </div> 
          */}
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-slate-600 font-light">
            {description.length > 40
              ? description.slice(0, 40) + "..."
              : description}
          </p>
          <ButtonBrand label="Open Snippet" onBtnClick={onBtnClick} />
        </div>
      </div>
    </div>
  );
};

export default CardSnippetShowCase;
