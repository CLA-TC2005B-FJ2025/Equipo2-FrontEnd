// src/hooks/useLogin.js

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function useLogin() {
  // Estado de autenticación
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(Cookies.get('username'));
  });
  const [showLogin, setShowLogin] = useState(() => {
    return !Boolean(Cookies.get('username'));
  });
  const [username, setUsername] = useState(() => {
    return Cookies.get('username') || null;
  });

  // URL base de tu API
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  // Carga el SDK de Facebook al montar
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '587664977003944',  // <- Reemplaza con tu App ID
        cookie: true,
        xfbml: true,
        version: 'v19.0',
      });
    };

    (function (d, s, id) {
      if (d.getElementById(id)) return;
      const js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      d.getElementsByTagName('head')[0].appendChild(js);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  // Login con usuario/contraseña convencional
  const handleNormalLogin = async (usernameInput, passwordInput) => {
    try {
      const res = await fetch(`${apiBaseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Error autenticando');
      }
      const data = await res.json();
      // Guarda en cookies y estado
      Cookies.set('username', data.user.username, { expires: 7 });
      Cookies.set('idUsuario', data.user.idusuario,  { expires: 7 });
      setUsername(data.user.username);
      setIsLoggedIn(true);
      setShowLogin(false);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  // Login con Facebook
  const handleFacebookLogin = () => {
    return new Promise((resolve, reject) => {
      window.FB.login(response => {
        if (response.authResponse) {
          window.FB.api('/me', { fields: 'name' }, async profile => {
            try {
              // Registra (o recupera) en /usuariored
              const reg = await fetch(`${apiBaseUrl}/usuariored`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  usuario:  profile.name,
                  contacto: 'Facebook'
                }),
              });
              const result = await reg.json();
              // Guarda en cookies y estado
              Cookies.set('username', profile.name, { expires: 7 });
              Cookies.set('idUsuario', result.idUsuario,   { expires: 7 });
              setUsername(profile.name);
              setIsLoggedIn(true);
              setShowLogin(false);
              resolve(true);
            } catch (err) {
              console.error('Error en registro de red social:', err);
              reject(err);
            }
          });
        } else {
          console.log('Login de Facebook cancelado o sin permisos.');
          resolve(false);
        }
      }, { scope: 'public_profile' });
    });
  };

  // Logout: limpia cookies y estado
  const handleLogout = () => {
    Cookies.remove('username');
    Cookies.remove('idUsuario');
    setUsername(null);
    setIsLoggedIn(false);
    setShowLogin(true);
  };

  return {
    isLoggedIn,
    showLogin,
    username,
    handleNormalLogin,
    handleFacebookLogin,
    handleLogout,
    setShowLogin,
  };
}