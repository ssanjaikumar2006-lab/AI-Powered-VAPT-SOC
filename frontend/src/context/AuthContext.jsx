import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem("sentinel_user");
    return cached ? JSON.parse(cached) : null;
  });

  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem("sentinel_user", JSON.stringify(userData));
    localStorage.setItem("sentinel_token", "mock-jwt-token");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("sentinel_user");
    localStorage.removeItem("sentinel_token");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
