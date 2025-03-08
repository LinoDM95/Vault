import { fetchWithAuth } from "./fetch_with_auth";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
export const CreateSnippet = async (url) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Nur einen Body mitsenden, wenn auch Daten vorhanden sind:
    //if (SnippetData) {
    //  options.body = JSON.stringify(SnippetData);
    //}

    const response = await fetchWithAuth(`${API_URL}/${url}`, options);

    if (!response.ok) {
      // Falls die Antwort kein JSON ist, könnte das hier einen Fehler auslösen.
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: "Serverfehler, kein JSON erhalten" };
      }
      throw new Error(errorData?.message || "Something went wrong");
    }

    const data = await response.json();
    console.log("successful:", data);
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};
