import { createContext, useContext, useState } from "react";
import api from "../api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  async function login(email, password) {
    const response = await fetch(api("/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid email or password");
    }

    const { accessToken, user } = await response.json();
    persist(accessToken, user);
  }

  async function register(email, password) {
    // TODO: POST to api("/register") with { email, password }
    // TODO: if the response is not ok, throw an error
    // TODO: destructure { accessToken, user } from the response JSON
    // TODO: call `persist` with accessToken and user to save the session
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // TODO add the missing logout logic here — clear the token and user from state as well
  }

  function persist(accessToken, user) {
    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(accessToken);
    setUser(user);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Usage: const { user, token, login, register, logout } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}
