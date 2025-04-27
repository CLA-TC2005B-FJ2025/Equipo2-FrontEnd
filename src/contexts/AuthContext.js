import React, { createContext, useState, useCallback } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => Cookies.get('username') || null);

  // <-- AÑADIMOS FALLBACK AQUÍ
  const apiBase = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5500';

  const login = useCallback(async (correo, contrasena) => {
    try {
      const resp = await fetch(`${apiBase}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contrasena })
      });
      if (!resp.ok) {
        console.error('Login error:', await resp.json());
        return false;
      }
      const data = await resp.json();
      setUser(data.correo);
      Cookies.set('username', data.correo, { expires: 7 });
      return true;
    } catch (e) {
      console.error('Login exception:', e);
      return false;
    }
  }, [apiBase]);

  const register = useCallback(async (correo, contrasena) => {
    try {
      const resp = await fetch(`${apiBase}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contrasena })
      });
      if (!resp.ok) {
        console.error('Register error:', await resp.json());
        return false;
      }
      return true;
    } catch (e) {
      console.error('Register exception:', e);
      return false;
    }
  }, [apiBase]);

  const logout = useCallback(() => {
    setUser(null);
    Cookies.remove('username');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
