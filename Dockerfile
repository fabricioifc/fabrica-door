FROM python:3.13-slim AS builder

WORKDIR /app

# Instalar dependências do sistema necessárias para compilação
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copiar e instalar dependências Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.13-slim

WORKDIR /app

# Instalar pacotes mínimos necessários para produção
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copiar ambiente Python da imagem de build
COPY --from=builder /usr/local/lib/python3.13/site-packages/ /usr/local/lib/python3.13/site-packages/
COPY --from=builder /usr/local/bin/ /usr/local/bin/

# Criar diretórios antes de mudar para o usuário não-root
RUN mkdir -p /app/content /app/output /app/themes

# Copiar arquivos de configuração e tema
COPY pelicanconf.py publishconf.py /app/
COPY entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh

# Copiar o tema se existir localmente
COPY themes/ /app/themes/

# Criar usuário não-root e ajustar permissões
RUN useradd -m appuser && \
    chown -R appuser:appuser /app

# Mudar para o usuário não-root
USER appuser

EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://0.0.0.0:${PORT} || exit 1

ENTRYPOINT ["/app/entrypoint.sh"]