#!/usr/bin/env bash

set -o errexit


cd frontend
yarn install
yarn build
cd ..


cd backend
pip install -r requirements.txt


python manage.py collectstatic --no-input


python manage.py migrate


if [[ $CREATE_SUPERUSER ]];
then
  python manage.py createsuperuser --no-input --email "$DJANGO_SUPERUSER_EMAIL"
fi