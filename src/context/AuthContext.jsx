import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { apiFetch, apiLogout } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("AG_USER");
    const storedToken = localStorage.getItem("AG_TOKEN");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = useCallback((authToken, userData) => {
    localStorage.setItem("AG_TOKEN", authToken);
    localStorage.setItem("AG_USER", JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    // Server-side: revoke refresh token cookie
    await apiLogout();
    setToken(null);
    setUser(null);
  }, []);

  const signup = async (payload) => {
    const data = await apiFetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    login(data.token, data.user);
  };

  const signin = async (payload) => {
    const data = await apiFetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    login(data.token, data.user);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
