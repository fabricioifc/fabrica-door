#!/bin/bash

# Verificar se o parâmetro de ambiente foi fornecido
if [ -z "$1" ]; then
    echo "Erro: Por favor, forneça o ambiente como parâmetro (dev|development ou prod|production)"
    echo "Uso: $0 <dev|development|prod|production>"
    exit 1
fi

# Validar o parâmetro
ENVIRONMENT="$1"
if [ "$ENVIRONMENT" != "dev" ] && [ "$ENVIRONMENT" != "development" ] && [ "$ENVIRONMENT" != "prod" ] && [ "$ENVIRONMENT" != "production" ]; then
    echo "Erro: Ambiente inválido. Use 'dev' ou 'development' para ambiente de desenvolvimento, ou 'prod' ou 'production' para ambiente de produção"
    exit 1
fi

# Carregar variáveis do .env de forma segura
if [ -f .env ]; then
    set -a  # Automaticamente exporta todas as variáveis
    # shellcheck disable=SC1091
    source .env
    set +a  # Desativa o modo de exportação automática
else
    echo "Erro: Arquivo .env não encontrado"
    exit 1
fi

# Função para exibir mensagens e logar
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Função para erro e rollback
error_exit() {
    log "Erro: $1"
    log "Iniciando rollback..."
    docker compose down || log "Falha ao executar rollback"
    exit 1
}

# Verificar pré-requisitos
command -v git >/dev/null 2>&1 || error_exit "Git não está instalado"
command -v docker >/dev/null 2>&1 || error_exit "Docker não está instalado"
command -v docker compose >/dev/null 2>&1 || error_exit "Docker Compose não está instalado"

# Parar os containers atuais
log "Parando containers..."
docker compose down || error_exit "Não foi possível parar os containers"

# Verificar se o branch existe no repositório remoto (apenas em production)
if [ "$ENVIRONMENT" = "prod" ] || [ "$ENVIRONMENT" = "production" ]; then
    log "Verificando branch '$BRANCH' no GitHub..."
    if ! git ls-remote --heads "$GITHUB_URL" "$BRANCH" >/dev/null; then
        error_exit "O branch $BRANCH não existe no repositório remoto"
    fi

    # Puxar mudanças do GitHub if production
    log "Puxando mudanças do branch $BRANCH..."
    git fetch origin && git reset --hard "origin/$BRANCH" || error_exit "Falha ao atualizar o repositório"

    # Criar rede se não existir
    if ! docker network ls --format '{{.Name}}' | grep -q "$NETWORK_NAME"; then
        log "Criando rede $NETWORK_NAME..."
        docker network create "$NETWORK_NAME" || error_exit "Falha ao criar rede $NETWORK_NAME"
    fi
fi

# Build e deploy
log "Subindo containers..."
if [ "$DOCKER_COMPOSE_BUILD" = "true" ]; then
    docker compose -f "$DOCKER_COMPOSE_FILE" up -d --build || error_exit "Falha ao subir containers"
else
    docker compose -f "$DOCKER_COMPOSE_FILE" up -d || error_exit "Falha ao subir containers"
fi

# Conectar à rede NGINX se necessário (apenas em production)
if [ "$ENVIRONMENT" = "prod" ] || [ "$ENVIRONMENT" = "production" ]; then
    if ! docker network inspect -f '{{range .Containers}}{{.Name}}{{end}}' "$NETWORK_NAME_NGINX" | grep -q "$PROJECT_NAME"; then
        log "Conectando $PROJECT_NAME à rede $NETWORK_NAME_NGINX..."
        docker network connect "$NETWORK_NAME_NGINX" "$PROJECT_NAME" || error_exit "Falha ao conectar à rede NGINX"
    fi
fi

log "Deploy finalizado com sucesso em modo $ENVIRONMENT."