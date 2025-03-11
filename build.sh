#!/usr/bin/env bash

set -o errexit  # Stoppt das Skript, wenn ein Fehler auftritt

echo "🚀 Starte den Build-Prozess..."

# --- Frontend ---
echo "📦 Installiere Frontend-Dependencies..."
cd frontend

# Entferne veraltete Node-Module, um Installationsprobleme zu vermeiden
rm -rf node_modules

# Installiere exakt die Abhängigkeiten aus yarn.lock
yarn install --frozen-lockfile

# Erstelle das Produktions-Build
echo "⚙️ Baue das Frontend..."
yarn build
cd ..

# --- Backend ---
echo "🐍 Installiere Backend-Dependencies..."
cd backend

# Aktualisiere pip, um Abhängigkeitsprobleme zu vermeiden
pip install --upgrade pip

# Installiere alle erforderlichen Python-Pakete
pip install -r requirements.txt

# Statische Dateien sammeln (Django)
echo "📁 Sammle statische Dateien..."
python manage.py collectstatic --no-input

# Datenbank-Migrationen ausführen (Django)
echo "🗄 Führe Datenbank-Migrationen durch..."
python manage.py migrate

# Falls ein Superuser erstellt werden soll, führe es aus
if [[$CREATE_SUPERUSER]];
then
  python manage.py createsuperuser --no-input
fi

echo "✅ Build abgeschlossen!"
