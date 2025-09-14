import api from "./api";

// --- Signup ---
export const signupUser = async (userData) => {
  try {
    if (!userData?.name || !userData?.email || !userData?.password) {
      throw new Error("❌ Missing signup fields");
    }

    console.log("📤 Signup request:", userData);

    const res = await api.post("/auth/signup", userData, {
      headers: { "Content-Type": "application/json" },
    });

    return res.data; // { message, user }
  } catch (err) {
    console.error("❌ Signup error:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

// --- Login ---
export const loginUser = async (credentials) => {
  try {
    if (!credentials?.email || !credentials?.password) {
      throw new Error("❌ Missing login fields");
    }

    console.log("📤 Login request:", credentials);

    const res = await api.post("/auth/login", credentials, {
      headers: { "Content-Type": "application/json" },
    });

    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data; // { token, user }
  } catch (err) {
    console.error("❌ Login error:", err.response?.data || err.message);
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
    if (!token) throw new Error("❌ No token found");

    const res = await api.get("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data; // { id, email, name, role }
  } catch (err) {
    console.error("❌ Profile error:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};
