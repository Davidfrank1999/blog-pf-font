import api from "./api";

// --- Signup ---
export const signupUser = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// --- Login ---
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data; // { token, user }
  } catch (error) {
    throw error.response?.data || error;
  }
};

// --- Logout ---
export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// --- Get Profile ---
export const getProfile = async (token) => {
  try {
    const response = await api.get("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
