// src/api.js

// ---- AUTH (simulado con users.json) ----
export async function loginUser({ email, password }) {
    // 1) Carga el JSON de usuarios desde public/users.json
    const res = await fetch("/users.json");
    if (!res.ok) {
      throw new Error("No se pudo cargar la lista de usuarios");
    }
    const users = await res.json();
  
    // 2) Busca coincidencia por email y password
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      throw new Error("Credenciales inválidas");
    }
  
    // 3) Devuelve el usuario sin la contraseña
    const { password: _omit, ...safeUser } = user;
    return { user: safeUser };
  }
  
  // Registro deshabilitado en modo demo
  export async function registerUser({ email, password }) {
    throw new Error("Registro deshabilitado en modo demo");
  }
  