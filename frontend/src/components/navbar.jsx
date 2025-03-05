import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ButtonCreate from "./ui_elements/buttons/button_create";
import CreateSnippetForm from "./pop_up_create_snippet";

/**
 * TODO: DOCU
 */

function Navbar({ navLinks = [] }) {
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
        <CreateSnippetForm
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          onClickClose={handleClosePopUpCreateSnippet}
        />
      )}

      <nav className="flex flex-col items-center mt-6 p-4 text-left bg-gradient-to-b from-primary to-secondary text-text-on-primary rounded-r-4xl h-screen">

        <div className="mb-7">
          <ButtonCreate
            buttonName="Erstellen oder hochladen"
            onBtnClick={() => {
              setShowCreateSnippetForm((prev) => !prev);
              setShowSelectMenu(false);
            }}
          />
        </div>


        <ul className="space-y-3 flex-grow">
          {navLinks.map((link, index) => (
            <li key={link.path || index}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md transition duration-300 ${
                    isActive ? "font-extrabold" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>


        <ul className="mb-20 flex flex-col items-center gap-5">
          <div className="">
            <li onClick={console.log("ewqd")}>Logout</li>
          </div>

          <li>Feedback</li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
