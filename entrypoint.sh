#!/bin/bash
set -e

# Verificar variáveis de ambiente
if [ -z "$CONTENT_PATH" ] || [ -z "$OUTPUT_PATH" ] || [ -z "$CONFIG_FILE" ] || [ -z "$PORT" ]; then
  echo "Erro: Variáveis de ambiente obrigatórias não estão definidas."
  echo "Certifique-se de definir CONTENT_PATH, OUTPUT_PATH, CONFIG_FILE e PORT."
  exit 1
fi

# Verificar se o tema existe
if [ -n "$THEME_NAME" ]; then
  if [ ! -d "/app/themes/$THEME_NAME" ]; then
    echo "Aviso: Tema '$THEME_NAME' não encontrado em /app/themes/."
    echo "Verificando temas disponíveis:"
    ls -la /app/themes/
  else
    echo "Tema '$THEME_NAME' encontrado."
  fi
fi

# Gerar site estático
echo "Gerando site com Pelican..."
echo "Usando CONTENT_PATH=$CONTENT_PATH, OUTPUT_PATH=$OUTPUT_PATH, CONFIG_FILE=$CONFIG_FILE"
pelican ${CONTENT_PATH} -o ${OUTPUT_PATH} -s ${CONFIG_FILE}

# Verificar se a geração foi bem-sucedida
if [ $? -ne 0 ]; then
  echo "Erro ao gerar o site com Pelican."
  exit 1
fi

# Iniciar o servidor Pelican
echo "Iniciando servidor Pelican..."
exec pelican --listen --bind 0.0.0.0 --port ${PORT} ${OUTPUT_PATH}