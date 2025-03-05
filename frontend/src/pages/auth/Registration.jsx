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


  async function handleRegister() {
    const registerData = {username: usernameValue, password: passwordValue}
    createUser(registerData)
  }



  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col w-100">
      <FormRegistration
          usernameValue={usernameValue}
          setUsernameValue={setUsernameValue}
          passwordValue={passwordValue}
          setPasswordValue={setPasswordValue}
        />
        <ButtonRegister buttonName="Registrieren" onBtnClick={handleRegister}/>
        <p className="mt-4 text-center">
          Bereits ein Konto? <Link to="/" className="text-blue-500">Hier einloggen</Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
