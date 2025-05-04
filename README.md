# Equipo2-FrontEnd: Pixel x Pixel

Este repositorio contiene la aplicación **Pixel x Pixel**, un juego interactivo de revelación progresiva de imágenes. Está compuesto por dos partes:

* **Backend (gridapp):** Servicio web en Flask con Socket.IO que gestiona la máscara de píxeles, las preguntas y las respuestas en tiempo real.
* **Frontend:** Aplicación React que consume el servicio, muestra la cuadrícula de píxeles y gestiona la autenticación y la interacción del usuario.

---

## Pre‑requisitos

* **Python 3.8+** y **pip**
* **Node.js 14+** y **npm**
* **Git**

## Backend: gridapp

1. Ubicado en la carpeta `gridapp`.
2. Crea un entorno virtual y actívalo:

   ```bash
   cd gridapp
   python3 -m venv .venv
   source .venv/bin/activate
   ```
3. Instala las dependencias:

   ```bash
   pip install -r requirements.txt
   ```
4. Ejecuta el servidor:

   ```bash
   python run.py
   ```
5. Por defecto expone:

   * API `GET /matrix` → matriz de máscara.
   * API `GET /questions/<row>/<col>` → pregunta aleatoria.
   * Socket.IO en `reveal_pixel` para revelar un píxel en tiempo real.

## Frontend: React

1. En la raíz del proyecto (fuera de `gridapp`):

   ```bash
   npm install
   npm start
   ```
2. Variables de entorno:

   * Copia `.env.example` a `.env.development`.
   * Ajusta `REACT_APP_API_BASE_URL=http://localhost:5000` (o la URL donde corre el backend).

## Estructura del Proyecto

```text
Equipo2-FrontEnd/
├── gridapp/                # Backend en Flask + Socket.IO
│   ├── app/
│   │   ├── routes/         # Endpoints REST y Socket handlers
│   │   ├── services/       # Lógica de generación de máscara
│   │   ├── templates/      # Página estática (no usada por React)
│   │   └── uploads/        # matrix.json, questions.json, base.png, result.png
│   ├── config.py
│   ├── requirements.txt
│   └── run.py
├── public/                 # Activos estáticos de React
├── src/                    # Código fuente React
│   ├── components/         # GamePage, Header, Leaderboard, ...
│   ├── contexts/           # AuthContext.js con cookies
│   ├── api.js              # Funciones para login
│   ├── App.js              # Rutas y proveedor de autenticación
│   ├── index.js            # Punto de entrada
│   └── style.css           # Estilos globales
├── package.json
└── README.md
```

## ¿Cómo funciona la autenticación?

* Se utiliza **React Context API** (`AuthContext.js`) con **js-cookie** para persistir la sesión.
* En **LoginPage** se validan credenciales contra `public/users.json` 
* Un usuario autenticado puede acceder a `/game` gracias a `react-router-dom`.

## Descripción Técnica del Juego

1. **Máscara de Píxeles:** El backend genera `matrix.json` y una imagen `result.png` con píxeles opacos.
2. **Carga de Matriz:** El frontend pide `/matrix` y construye una cuadrícula con `div.cell` en **CSS Grid**.
3. **Revelación de Píxeles:** Al hacer click en una celda, el cliente fetchea `/questions/row/col` y abre un modal de opción múltiple.
4. **Validación:** Si la respuesta coincide con `correctOption`, emite `socket.emit('reveal_pixel')` y el backend actualiza `matrix.json` y `result.png`.
5. **Sincronización en Tiempo Real:** Todos los clientes reciben `pixel_revealed` por Socket.IO y actualizan la cuadrícula y la imagen.
6. **Notificación de Aciertos/Errores:** Se reproduce un "beep" en cada pixel revelado y se muestran alertas en caso de error.

---
