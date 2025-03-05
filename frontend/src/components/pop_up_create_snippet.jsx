//TODO: Refactor !!!
import { useState, useContext } from "react";
import { AuthContext } from "../utils/auth_context";
import { SnippetContext } from "../utils/snippet_context";
import PopUpBase from "./bases/pop_up_base";
import InputNormal from "./ui_elements/input/input_normal";

/**
 * TODO: DOCU
 */

const CreateSnippetForm = ({ onClickClose }) => {
  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  const { user } = useContext(AuthContext);
  const { refreshSnippets } = useContext(SnippetContext);

  const [formData, setFormData] = useState({
    user_id: user.id,
    title: "",
    language: "",
    description: "",
    code: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/create-snippet/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Snippet wurde erfolgreich gespeichert!");
        setFormData({ title: "", language: "", description: "", code: "" });
        refreshSnippets();
        onClickClose();
      } else {
        setMessage("Fehler: " + JSON.stringify(data.errors));
      }
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <PopUpBase title="Snippet erstellen" onClick={onClickClose}>
      {message && <p className="mb-4 text-center">{message}</p>}

      <form onSubmit={handleSubmit} className="w-150 space-y-4">
        <InputNormal
          label="Titel"
          name="title"
          inputValue={formData.title}
          onInputChange={(value) => setFormData({ ...formData, title: value })}
        />
        <InputNormal
          label="Sprache"
          name="language"
          inputValue={formData.language}
          onInputChange={(value) =>
            setFormData({ ...formData, language: value })
          }
        />
        <InputNormal
          label="Beschreibung"
          name="description"
          inputValue={formData.description}
          onInputChange={(value) =>
            setFormData({ ...formData, description: value })
          }
        />
        <InputNormal
          label="Code"
          name="code"
          inputValue={formData.code}
          onInputChange={(value) => setFormData({ ...formData, code: value })}
        />
        <div className="flex">
          <button
            className="group flex items-center gap-2 px-4 py-2 rounded-full text-white bg-gradient-to-r from-[#0F6CBD] to-blue-900 hover:brightness-75 transition-all duration-300"
            type="submit"
          >
            Speichern
          </button>
        </div>
      </form>
    </PopUpBase>
    /*
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Neues Snippet erstellen</h2>

      {message && <p className="mb-4 text-center">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold">Titel:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Sprache:</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">
            Beschreibung:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Code:</label>
          <textarea
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="w-full border p-2 rounded font-mono"
            required
          />
        </div>
        <div className="flex">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Speichern
          </button>
        </div>
      </form>
    </div>*/
  );
};

export default CreateSnippetForm;
