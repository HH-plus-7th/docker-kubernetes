#!/bin/sh
set -e

# Postgres가 TCP 수신 준비될 때까지 대기 (depends_on은 컨테이너 시작만 기다림)
echo "Waiting for DB..."
python -c "
import os, time
import psycopg2
for _ in range(30):
    try:
        psycopg2.connect(
            dbname=os.environ.get('DB_NAME', 'shop'),
            user=os.environ.get('DB_USER', 'shopuser'),
            password=os.environ.get('DB_PASSWORD', 'shoppass'),
            host=os.environ.get('DB_HOST', 'db'),
            port=os.environ.get('DB_PORT', '5432'),
        ).close()
        exit(0)
    except Exception:
        time.sleep(1)
exit(1)
"

python manage.py migrate --noinput

exec gunicorn config.wsgi:application --bind 0.0.0.0:8000

