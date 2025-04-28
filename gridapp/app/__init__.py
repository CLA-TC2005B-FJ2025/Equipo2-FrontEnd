import os
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from config import Config

# crea SocketIO antes de la app
socketio = SocketIO(cors_allowed_origins="*")

def init_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # habilita CORS para todas las rutas
    CORS(app)

    # registra blueprint de rutas
    from app.routes.homeRoutes import main as home_blueprint
    app.register_blueprint(home_blueprint, url_prefix="/")

    # inicializa socketio
    socketio.init_app(app)
    return app
