#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

echo "Starte den Build-Prozess..."

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

echo "Installiere Frontend-Dependencies..."
cd "$SCRIPT_DIR/frontend"

if command -v yarn &> /dev/null; then
    rm -rf node_modules
    yarn install --frozen-lockfile
else
    echo "❌ Yarn ist nicht installiert. Bitte installieren Sie Yarn und versuchen Sie es erneut."
    exit 1
fi

echo "Baue das Frontend..."
yarn build
cd "$SCRIPT_DIR"

echo "Erstelle und aktiviere virtuelle Umgebung für das Backend..."
cd "$SCRIPT_DIR/backend"

python3 -m venv env
echo "env wurde aktiviert"
source env/bin/activate

if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 ist nicht installiert. Bitte installieren Sie Python3 und versuchen Sie es erneut."
    exit 1
fils

echo "Aktualisiere pip..."
pip install --upgrade pip

echo "Installiere Backend-Dependencies..."
pip install -r requirements.txt

echo "Sammle statische Dateien..."
python manage.py collectstatic --no-input

echo "Führe Datenbank-Migrationen durch..."
python manage.py migrate

echo "✅ Build abgeschlossen!"
