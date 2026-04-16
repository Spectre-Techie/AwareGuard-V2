import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { apiFetch, apiLogout } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutProgress, setLogoutProgress] = useState(0);

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
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setLogoutProgress(8);

    const animationStart = Date.now();
    const minimumAnimationMs = 700;
    let progress = 8;

    const progressInterval = setInterval(() => {
      progress = Math.min(92, progress + Math.floor(Math.random() * 12) + 4);
      setLogoutProgress(progress);
    }, 130);

    try {
      // Server-side: revoke refresh token cookie
      await apiLogout();

      const elapsed = Date.now() - animationStart;
      if (elapsed < minimumAnimationMs) {
        await new Promise((resolve) => setTimeout(resolve, minimumAnimationMs - elapsed));
      }

      clearInterval(progressInterval);
      setLogoutProgress(100);

      await new Promise((resolve) => setTimeout(resolve, 180));

      setToken(null);
      setUser(null);
    } finally {
      clearInterval(progressInterval);
      setIsLoggingOut(false);
      setLogoutProgress(0);
    }
  }, [isLoggingOut]);

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
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        signin,
        logout,
        isLoggingOut,
        logoutProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
