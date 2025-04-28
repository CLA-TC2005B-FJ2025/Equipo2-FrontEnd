import os
from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS        # ← Nueva línea
from config import Config

# Creamos el objeto socketio **antes** de inicializar la app
socketio = SocketIO(cors_allowed_origins="*")

def init_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # --- NUEVO: habilitamos CORS en TODAS las rutas ---
    CORS(app, resources={ r"/*": {"origins": "*"} })

    # Registramos el blueprint **dentro** de init_app para evitar import circular
    from app.routes.homeRoutes import main as home_blueprint
    app.register_blueprint(home_blueprint, url_prefix="/")

    # Inicializamos socketio con la app
    socketio.init_app(app)

    return app
