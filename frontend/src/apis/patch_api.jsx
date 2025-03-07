import { fetchWithAuth } from "./fetch_with_auth";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
export const PatchAPI = async (url, data) => {
  console.log(url, data);
  try {
    const response = await fetchWithAuth(`${API_URL}/${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("example error");

    const responseData = await response.json();
    return responseData;
    console.log(responseData);
  } catch (error) {
    console.error("Error:", error.message);
  }
};
