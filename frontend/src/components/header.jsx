import React, { useContext } from "react";
import GlobSearchInput from "./ui_elements/input/input_glob";
import UserLogo from "./user_logo";
import { AuthContext } from "../utils/auth_context";

/**
 * TODO: DOCU
 */

function Header({}) {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-between w-full ">
      <div className="flex items-center gap-4 ">
        <h1 className="text-primary font-semibold text-4xl">SnippetVault</h1>
      </div>

      <GlobSearchInput />
      <div>
        <UserLogo user={user?.username || "Guest"}  />
      </div>
    </div>
  );
}

export default Header;
