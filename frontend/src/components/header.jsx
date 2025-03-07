import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../utils/auth_context";
import { motion } from "framer-motion";

import GlobSearchInput from "./ui_elements/input/input_glob";
import UserLogo from "./user_logo";
import ButtonCreate from "./ui_elements/buttons/button_create";
import CreateSnippetForm from "./pop_up_create_snippet";
import NavlinkHeader from "./ui_elements/navlinks/navlink_header";
/**
 * TODO: DOCU
 */

function Header({}) {
  const { user } = useContext(AuthContext);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const { logout } = useContext(AuthContext);

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
          className="flex absolute top-full right-0 bg-primary text-text-on-primary rounded-b-4xl shadow-lg p-10 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="col-start-3 flex flex-col gap-3">
            <button onClick={logout} className="cursor-pointer hover:text-secondary transition-all duration-300">
              Logout
            </button>
          </div>
        </motion.div>
      )}

      <div className="flex items-center gap-4 ">
        <h1 className="font-semibold text-4xl text-text-on-primary">
          SnippetVault<span className="text-outline-ui">.</span>
        </h1>
      </div>

      <GlobSearchInput />
      <div className="flex items-center gap-5 ">
        <nav className="flex gap-6">
          <NavlinkHeader
            title="Snippet Table"
            navigationLink="/Snippet_Table"
          />
          <NavlinkHeader title="Snippet Hub" navigationLink="/Snippet_Hub" />
        </nav>

        <ButtonCreate
          onBtnClick={() => setShowCreateSnippetForm((prev) => !prev)}
          buttonName="Create Snippet"
        />

        <UserLogo
          onClick={() => setIsOpenNav((prev) => !prev)}
          user={user?.username || "Guest"}
          className="text-text-on-primary bg-primary border-secondary hover:text-secondary border w-10 h-10 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Header;
