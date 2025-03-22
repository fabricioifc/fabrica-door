#!/bin/bash

# Garantir que o script falhe se houver erros
set -e

# Validar variáveis de ambiente obrigatórias
if [ -z "$OUTPUT_PATH" ] || [ -z "$PORT" ]; then
    echo "Erro: Variáveis OUTPUT_PATH e PORT são obrigatórias"
    exit 1
fi

# Verificar se o diretório de saída existe
if [ ! -d "$OUTPUT_PATH" ]; then
    echo "Erro: O diretório de saída '$OUTPUT_PATH' não existe"
    exit 1
fi

# Servir o site com o servidor embutido do Python
echo "Iniciando servidor na porta $PORT..."
exec python -m http.server --directory "$OUTPUT_PATH" --bind 0.0.0.0 "$PORT"
