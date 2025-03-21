import { useState } from "react";
import { Link } from "react-router-dom";
import FormRegistration from "../../components/form_registration";
import ButtonRegister from "../../components/ui_elements/buttons/button_registration";
import { createUser } from "../../apis/create_user";
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

/**
 * TODO: DOCU
 */

const Registration = () => {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleRegister() {
    const registerData = { username: usernameValue, password: passwordValue };
    try {
      const result = await createUser(registerData);
      if (result) {
        window.location.href = "/";
      }
    } catch (error) {
      setErrorMessage("Something went wrong during registration!");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex flex-col w-full max-w-md">
        <FormRegistration
          usernameValue={usernameValue}
          setUsernameValue={setUsernameValue}
          passwordValue={passwordValue}
          setPasswordValue={setPasswordValue}
        />
        <ButtonRegister buttonName="Sign Up" onBtnClick={handleRegister} />
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500">
            Log in here
          </Link>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </p>
      </div>
    </div>
  );
};

export default Registration;
