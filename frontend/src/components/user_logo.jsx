import React from "react";

function UserLogo({ 
  user, 
  onClick,
  className = "", 
}) {
  const words = user ? user.trim().split(/\s+/) : [];

  let userTag = "?";

  if (words.length > 0) {
    const firstInitial = words[0][0]?.toUpperCase() || "";
    const lastInitial =
      words.length > 1 ? words[words.length - 1][0]?.toUpperCase() : "";

    userTag = lastInitial ? firstInitial + lastInitial : firstInitial;
  }

  return (
    <div
      className={`${className} font-semibold rounded-full flex items-center justify-center transition-all duration-300`}
      onClick={onClick}
    >
      <p>{userTag}</p>
    </div>
  );
}

export default UserLogo;
