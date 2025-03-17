FROM python:3.13-slim

WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Copiar e instalar dependências Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar o projeto
COPY . .

# Usar variáveis de ambiente no CMD
CMD ["sh", "-c", "gunicorn --bind ${GUNICORN_BIND}:${GUNICORN_PORT} --workers ${GUNICORN_WORKERS} wsgi:application"]