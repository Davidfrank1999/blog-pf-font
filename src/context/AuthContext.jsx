import { createContext, useEffect, useState } from "react";
import { getProfile } from "@/services/authServices";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate(); 
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            // Fetch fresh user profile when app loads
            setUser({ token }); // change this
        }
    }, [])

    const login = async (credentials) => {
        localStorage.setItem('token', token)
        //After login, fetch fresh user profile
        getProfile().then(res => {
            setUser(res.data);
            navigate('/dashboard');
        })
        
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    const updateUser = (newUserData) => {
        setUser((prevUser) => ({ ...prevUser, ...newUserData }));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};