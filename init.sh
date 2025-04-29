#!/usr/bin/env bash
set -e

# Nombre del entorno (opcional)
ENV_NAME="venv"

echo "1. Comprobando python3..."
if ! command -v python3 &>/dev/null; then
  echo "Error: python3 no está instalado." >&2
  exit 1
fi

echo "2. (Opcional) Creando entorno virtual ‘$ENV_NAME’..."
python3 -m venv "$ENV_NAME"
source "$ENV_NAME/bin/activate"

echo "3. Actualizando pip..."
python3 -m pip install --upgrade pip

echo "4. Instalando dependencias..."

packages=(
  python-dotenv
  Pillow
  Flask
  flask_socketio
  numpy
  flask_cors
)

for pkg in "${packages[@]}"; do
  echo "  • Instalando $pkg..."
  python3 -m pip install "$pkg"
done

echo "¡Listo! Todas las dependencias están instaladas."
