import React, { createContext, useState, useCallback } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    // Intenta obtener el usuario de las cookies al cargar el componente
    const storedUser = Cookies.get('username');
    return storedUser ? storedUser : null;
  });

  // Ruta local para el archivo JSON
  const usersJsonPath = '/users.json';

  const login = useCallback(async (username, password) => {
    try {
      const response = await fetch(usersJsonPath);
      const users = await response.json();

      // Busca al usuario en el archivo JSON
      const foundUser = users.find(user => user.username === username && user.password === password);

      if (foundUser) {
        setUser(username);
        // Guarda el username en una cookie
        Cookies.set('username', username, { expires: 7 }); // Expira en 7 días
        return true;
      } else {
        console.error('Usuario o contraseña incorrectos');
        return false;
      }
    } catch (error) {
      console.error('Error durante login:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    // Elimina la cookie del username al cerrar sesión
    Cookies.remove('username');
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
