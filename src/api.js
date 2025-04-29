// src/api.js
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

// Función para manejar errores
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en la solicitud');
    }
    return response.json();
};

// GET: Obtener todos los registros de una tabla
export const getAllFromTable = async (table) => {
    const response = await fetch(`${apiBaseUrl}/test`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ table }),
    });
    return handleResponse(response);
};

// GET: Obtener un registro por ID
export const getOneFromTable = async (table, id) => {
  const response = await fetch(`${apiBaseUrl}/test/${table}/${id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
  });
  return handleResponse(response);
};

// POST: Insertar un nuevo registro
export const insertIntoTable = async (table, data) => {
    const response = await fetch(`${apiBaseUrl}/test`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ table, ...data }),
    });
    return handleResponse(response);
};

// PUT: Actualizar un registro
export const updateTableById = async (table, id, data) => {
    const response = await fetch(`${apiBaseUrl}/test/${table}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};

// DELETE: Eliminar un registro
export const deleteFromTableById = async (table, id) => {
    const response = await fetch(`${apiBaseUrl}/test/${table}/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};



////////////////// POST: Login
export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${apiBaseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: email,
      password: password,
    }),
  });
  return handleResponse(response);
};

///////////////////////// POST: Registro
export const registerUser = async ({ email, password }) => {
  const response = await fetch(`${apiBaseUrl}/test`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      table: 'usuario',
      username: email,
      contrasena: password,
      puntaje: 0,
    }),
  });
  return handleResponse(response);
};

// ---- AUTH (simulado con users.json) ----
//export async function loginUser({ email, password }) {
//    // 1) Carga el JSON de usuarios desde public/users.json
//    const res = await fetch("/users.json");
//    if (!res.ok) {
//      throw new Error("No se pudo cargar la lista de usuarios");
//    }
//    const users = await res.json();
//  
//    // 2) Busca coincidencia por email y password
//    const user = users.find(
//      (u) => u.email === email && u.password === password
//    );
//    if (!user) {
//      throw new Error("Credenciales inválidas");
//    }
//  
//    // 3) Devuelve el usuario sin la contraseña
//    const { password: _omit, ...safeUser } = user;
//    return { user: safeUser };
//  }
//  
//  // Registro deshabilitado en modo demo
//  export async function registerUser({ email, password }) {
//    throw new Error("Registro deshabilitado en modo demo");
//  }
//  