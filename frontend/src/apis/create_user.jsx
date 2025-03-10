const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
export const createUser = async (registerData) => {
  try {
    const response = await fetch(`${API_URL}/create-user/`, {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Something went wrong");
    }

    const data = await response.json();
    console.log("User creation succeeded:", data);
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};