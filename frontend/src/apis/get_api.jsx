/**
 * Simple get request as an generic fetch
 */

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
export const getData = async (url, user_id = null) => {
  try {
    const fullUrl = user_id ? `${API_URL}/${url}/${user_id}` : `${API_URL}/${url}`;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("example error");

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
};