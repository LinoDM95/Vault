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
  const [error, setError] = useState("");

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
      setError(err.message);
      console.log(err.message);
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
        {error && (
          <p
            className="flex items-center justify-center"
            style={{ color: "red" }}
          >
            Incorrect username or password
          </p>
        )}
        <p className="mt-4 text-center">
          Not registered yet?{" "}
          <Link to="/register" className="text-blue-500">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
