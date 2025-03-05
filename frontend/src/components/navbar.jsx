import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ButtonCreate from "./ui_elements/buttons/button_create";
import ButtonNoBackground from "./ui_elements/buttons/button_no_background";
import CreateSnippetForm from "./pop_up_create_snippet";
import { FaFileCirclePlus } from "react-icons/fa6";
import { RiScreenshot2Fill } from "react-icons/ri";
import { PiCodeBold } from "react-icons/pi";

import ButtonAddRoundedFull from "./ui_elements/buttons/button_add_roundedfull";

/**
 * TODO: DOCU
 */


function Navbar({ username = "Guest", navLinks = [], linkIcons = [] }) {
  const [showSelectMenu, setShowSelectMenu] = useState(false);
  const [showCreateSnippetForm, setShowCreateSnippetForm] = useState(false);
  const selectMenuRef = useRef(null);
  /**
   * !Open/Close selectMenu
   */
  function handleButtonCreate() {
    setShowSelectMenu((prev) => !prev);
  }

  const handleCloseSelectMenu = (event) => {
    if (
      selectMenuRef.current &&
      !selectMenuRef.current.contains(event.target)
    ) {
      setShowSelectMenu(false);
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      setShowSelectMenu(false);
    }
  };

  useEffect(() => {
    if (showSelectMenu) {
      document.addEventListener("mousedown", handleCloseSelectMenu);
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleCloseSelectMenu);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showSelectMenu]);

  function handleClosePopUpCreateSnippet() {
    setShowCreateSnippetForm(false);
  }

  return (
    <div>
      {showCreateSnippetForm && (
          <CreateSnippetForm className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            onClickClose={
              handleClosePopUpCreateSnippet}
          />
      )}

      <nav className="mt-6 p-4 text-left bg-primary text-text-on-primary rounded-r-4xl h-screen ">
        <div className="mb-7">
          <ButtonAddRoundedFull onBtnClick={console.log("!")}/>
          <div className="relative inline-block">
            <ButtonCreate
              buttonName="Erstellen oder hochladen"
              onBtnClick={handleButtonCreate}
            />
            {showSelectMenu && (
              <div className="absolute left-0 mt-2 bg-white p-6 rounded-lg shadow-lg z-50 min-w-max">
                <div ref={selectMenuRef}>
                  <div className="space-y-4">
                    <ButtonNoBackground
                      buttonName="Snippet erstellen"
                      img={<PiCodeBold size={24} />}
                      onBtnClick={() => {
                        setShowCreateSnippetForm((prev) => !prev);
                        setShowSelectMenu(false);
                      }}
                    />
                    <ButtonNoBackground
                      buttonName="Screenshot hochladen"
                      img={<RiScreenshot2Fill size={24} />}
                    />
                    <ButtonNoBackground
                      buttonName="Datei hochladen"
                      img={<FaFileCirclePlus size={24} />}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <ul className="space-y-3">
          {navLinks.map((link, index) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md transition duration-300 ${
                    isActive
                      ? "font-extrabold"
                      : "hover:bg-secondary"
                  }`
                }
              >

                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
