// src/contexts/AuthContext.js

import React, { createContext, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { loginUser, registerUser } from "../api";

export const AuthContext = createContext({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  // Inicializa user desde cookie (si existe)
  const [user, setUser] = useState(() => {
    const cookie = Cookies.get("user");
    return cookie ? JSON.parse(cookie) : null;
  });

  // Login: llama a loginUser y guarda en cookie/estado
  const login = useCallback(async (email, password) => {
    const data = await loginUser({ email, password });
    Cookies.set("user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }, []);

  // Register: en demo lanza error; en real llamaría a registerUser
  const register = useCallback(async (email, password) => {
    return registerUser({ email, password });
  }, []);

  // Logout: limpia cookie y estado
  const logout = useCallback(() => {
    Cookies.remove("user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
