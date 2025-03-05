import React from "react";

function UserLogo({ user, onClick }) {
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
      className="text-text-on-primary bg-primary font-semibold rounded-full border flex items-center justify-center w-10 h-10 cursor-pointer"
      onClick={onClick}
    >
      <p>{userTag}</p>
    </div>
  );
}

export default UserLogo;
