// src/context/AuthContext.jsx
import { createContext, useEffect, useState, useContext } from "react";
import { loginUser, signupUser, getProfile } from "@/services/authServices";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile(token)
        .then((res) => setUser(res))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async ({ email, password }) => {
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.token);
      setUser(res.user);
      navigate("/dashboard");
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const signup = async ({ name, email, password }) => {
    try {
      await signupUser({ name, email, password });
      return true;
    } catch (err) {
      console.error("Signup failed:", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Default export
export default AuthProvider;

// Named hook export
export function useAuth() {
  return useContext(AuthContext);
}
