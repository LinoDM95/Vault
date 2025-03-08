import { fetchWithAuth } from "./fetch_with_auth";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

/**
 * ! deleteItem
 * ! IMPORTANT!
 * ! This API deletes an item using the ID in the API URL. 
 * ! If you need to use a different method, such as JSON, you will need to implement it here.
 * 
 * 
 */

export const deleteItem = async (id) => {
  try {
    const response = await fetchWithAuth(`${API_URL}/delete-item/${id}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Deletion went wrong: ${response.status}`);
    }
    console.log(`Item with the id: ${id} deleted.`);
  } catch (error) {
    console.error("Error:", error.message);
  }
};
