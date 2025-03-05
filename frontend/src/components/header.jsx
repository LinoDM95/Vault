import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../utils/auth_context";
import { motion } from "framer-motion";

import GlobSearchInput from "./ui_elements/input/input_glob";
import UserLogo from "./user_logo";
import ButtonBurger from "./ui_elements/buttons/button_burger";
import ButtonCreate from "./ui_elements/buttons/button_create";
import CreateSnippetForm from "./pop_up_create_snippet";
/**
 * TODO: DOCU
 */

function Header({}) {
  const { user } = useContext(AuthContext);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const { logout } = useContext(AuthContext);
  const navLinks = [
    { name: "Snippet Hub", path: "/Snippet_Hub" },
    { name: "Snippet Table", path: "/Snippet_Table" },
  ];

  const [showCreateSnippetForm, setShowCreateSnippetForm] = useState(false);

  function handleClosePopUpCreateSnippet() {
    setShowCreateSnippetForm(false);
  }

  return (
    <div className="flex items-center justify-between w-full relative">
      {showCreateSnippetForm && (
        <CreateSnippetForm
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          onClickClose={handleClosePopUpCreateSnippet}
        />
      )}
      {isOpenNav && (
        <motion.div
          className="flex flex-col items-center absolute top-full right-0 w-48 bg-gradient-to-b from-primary to-secondary text-text-on-primary rounded-b-4xl shadow-lg p-2 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
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
        </motion.div>
      )}

      <div className="flex items-center gap-4 ">
        <h1 className="font-semibold text-4xl text-text-on-primary">
          SnippetVault<span className="text-outline-ui">.</span>
        </h1>
      </div>

      <GlobSearchInput />
      <div className="flex items-center gap-5">
        <UserLogo user={user?.username || "Guest"} />
        <ButtonBurger onBtnClick={() => setIsOpenNav((prev) => !prev)} />
      </div>
    </div>
  );
}

export default Header;
