# gridapp/run.py
from app import init_app, socketio

app = init_app()

if __name__ == "__main__":
    # con socketio.run para WebSockets
    socketio.run(app, debug=True)
