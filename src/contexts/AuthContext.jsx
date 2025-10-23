import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();
const API_URL = `${import.meta.env.VITE_API_URL}/api/auth/login`;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const res = await axios.post(API_URL, {
      username,
      password,
    });
    const { token, user } = res.data;
    setUser({ ...user, token });
    localStorage.setItem("user", JSON.stringify({ ...user, token }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
