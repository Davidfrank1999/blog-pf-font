import { createContext, useEffect, useState , useContext} from "react";
import { apisignupUser, getProfile, apiloginUser, apilogoutUser } from "@/services/authServices";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate(); 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            console.log("Fetching profile with token:", accessToken);
            getProfile(accessToken)
            .then((res) => setUser(res))
            .catch(() => {
            localStorage.removeItem("accessToken");
            setUser(null);
        })
        .finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
  }, []);

    /* auth */
    const login = async (credentials) => {
        try {
            const res = await apiloginUser(credentials);
            const { accessToken, user: userData } = res.data; // adjust based on API response
            localStorage.setItem("accessToken", accessToken);
            
            setUser(userData);
            setLoading(false);
            return true;
        } catch (err) {
            console.error("Login failed:", err);
            return false;
        }
    };

    const signup = async ({ name, email, password }) => {
        try {
            await apisignupUser({ name, email, password });
            return true;
        } catch (err) {
            console.error("Signup failed:", err);
            return false;
        }
    };

    const logout = () => {
        apilogoutUser();
        setUser(null);
        navigate('/login');
    };

    const updateUser = (newUserData) => {
        setUser((prevUser) => ({ ...prevUser, ...newUserData }));
    
    
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout,loading, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export { AuthContext };
export default AuthProvider;