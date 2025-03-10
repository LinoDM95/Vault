import { useState } from "react";
import { Link } from "react-router-dom";
import FormLogin from "../../components/form_login";
import ButtonLogin from "../../components/ui_elements/buttons/button_login";
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

/**
 * TODO: DOCU
 */

const Login = () => {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin(event);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameValue,
          password: passwordValue,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail);
      }
      const data = await response.json();
      sessionStorage.setItem("access", data.access);
      sessionStorage.setItem("refresh", data.refresh);
      window.location.href = "/Snippet_Table";
    } catch (err) {
      setErrorMessage("Something went wrong during login!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col w-100">
        <FormLogin
          usernameValue={usernameValue}
          setUsernameValue={setUsernameValue}
          passwordValue={passwordValue}
          setPasswordValue={setPasswordValue}
          onKeyDown={handleKeyDown}
        />
        <ButtonLogin buttonName="Log In" onBtnClick={handleLogin} />
        <p className="mt-4 text-center">
          Not registered yet?{" "}
          <Link to="/register" className="text-blue-500">
            Sign up here
          </Link>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </p>
      </div>
    </div>
  );
};

export default Login;
