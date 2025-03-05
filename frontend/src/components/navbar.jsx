import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../utils/auth_context";
import ButtonCreate from "./ui_elements/buttons/button_create";
import CreateSnippetForm from "./pop_up_create_snippet";

/**
 * TODO: DOCU
 */

function Navbar({ navLinks = [] }) {
  const [showSelectMenu, setShowSelectMenu] = useState(false);
  const [showCreateSnippetForm, setShowCreateSnippetForm] = useState(false);


  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      setShowSelectMenu(false);
    }
  };


  function handleClosePopUpCreateSnippet() {
    setShowCreateSnippetForm(false);
  }

  return (
    <div className="bg-red-500">
      {showCreateSnippetForm && (
        <CreateSnippetForm
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          onClickClose={handleClosePopUpCreateSnippet}
        />
      )}

      <nav className="flex flex-col items-center p-4 text-left bg-gradient-to-b from-primary to-secondary text-text-on-primary rounded-r-4xl h-screen">
        <div className="mb-7">
          <ButtonCreate
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
                  `flex items-center justify-center gap-2 rounded-md transition duration-300 ${
                    isActive ? "font-extrabold" : ""
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
