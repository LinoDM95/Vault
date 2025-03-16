#!/usr/bin/env bash

set -o errexit 

echo "🚀 Starte den Build-Prozess..."

echo "📦 Installiere Frontend-Dependencies..."
cd frontend

rm -rf node_modules

yarn install --frozen-lockfile

echo "⚙️ Baue das Frontend..."
yarn build
cd ..

echo "🐍 Installiere Backend-Dependencies..."
cd backend

python3 -m venv env
echo "env wurde aktiviert"
source env/bin/activate

pip install --upgrade pip

pip install -r requirements.txt

echo "📁 Sammle statische Dateien..."
python manage.py collectstatic --no-input

echo "🗄 Führe Datenbank-Migrationen durch..."
python manage.py migrate


echo "✅ Build abgeschlossen!"
