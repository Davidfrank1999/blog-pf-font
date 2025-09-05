import api from "./api";

// --- Signup ---
export const apisignupUser = async (userData) => {
  try {
    const res = await api.post("/auth/register", userData); // make sure backend matches
    return res.data; // { message, user }
  } catch (err) {
    throw err.response?.data?.message || err.message || "Signup failed";
  }
};

// --- Login ---
3
export const apiloginUser = async (credentials) => {
  try {
    const res = await api.post("/auth/login", credentials);
    if (res.data?.accessTokentoken) {
      localStorage.setItem("accessToken", res.data.accessToken);
    }
    return res.data; // { token, user }
  } catch (err) {
    throw err.response?.data?.message || err.message || "Login failed";
  }
};

// --- Logout ---
export const apilogoutUser = async () => {
  localStorage.removeItem("accessToken");
  const response = await api.post('/auth/logout');
    return response.data;
};

// --- Get Profile ---
export const getProfile = async () => {
  try {
    
    const res = await api.get("/user/getUserProfile"); // token auto-attached via interceptor
    return res.data; // { id, email, name, role }
  } catch (err) {
    throw err.response?.data?.message || err.message || "Failed to fetch profile";
  }
};


