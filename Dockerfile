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

# Comando para gerar e servir o site
CMD ["sh", "-c", "pelican ${CONTENT_PATH} -o ${OUTPUT_PATH} -s ${CONFIG_FILE} && pelican --listen --bind 0.0.0.0 --port ${PORT} ${OUTPUT_PATH}"]