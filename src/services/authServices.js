import api from "./api";

// --- Signup ---
export const signupUser = async (userData) => {
  try {
    const res = await api.post("/auth/signup", userData);
    return res.data; // { message, user }
  } catch (err) {
    throw err.response?.data || err;
  }
};

// --- Login ---
export const loginUser = async (credentials) => {
  try {
    const res = await api.post("/auth/login", credentials);
    // Save token for later API calls
    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
    }
    return res.data; // { token, user }
  } catch (err) {
    throw err.response?.data || err;
  }
};

// --- Logout (client-side only) ---
export const logoutUser = () => {
  localStorage.removeItem("token");
  return { message: "Logged out" };
};

// --- Get Profile ---
export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const res = await api.get("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data; // { id, email, name, role }
  } catch (err) {
    throw err.response?.data || err;
  }
};
