#!/usr/bin/env python
# -*- coding: utf-8 -*- #
import os

AUTHOR = 'Fábrica de Software'
SITENAME = os.getenv("SITE_NAME", "Fábrica de Software - IFC Videira")
SITEURL = os.getenv("SITE_URL", "http://localhost:8000")
PATH = os.getenv("CONTENT_PATH", "content")
OUTPUT_PATH = os.getenv("OUTPUT_PATH", "output")
DELETE_OUTPUT_DIRECTORY = True
THEME = 'themes/fabrica'

STATIC_PATHS = ['images']
PAGE_PATHS = ['pages']
ARTICLE_PATHS = []

TIMEZONE = 'America/Sao_Paulo'
DEFAULT_LANG = 'pt-br'

# Tema customizado
# THEME = 'themes/monospace'

# URLs
PAGE_URL = '{slug}.html'
PAGE_SAVE_AS = '{slug}.html'
INDEX_SAVE_AS = 'index.html'

# Desativar feeds, pois não serão necessários para uma landing page
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Configurações de menu
MENUITEMS = [
    ('Início', '/'),
    ('Sobre', '/sobre'),
    ('Projetos', '/projetos'),
    ('Equipe', '/equipe'),
    ('Contato', '/contato'),
]

# Plugins, se necessário
PLUGIN_PATHS=['plugins']
PLUGINS = ['sitemap']

# Configurações adicionais
DEFAULT_PAGINATION = False

from datetime import datetime

JINJA_GLOBALS = {
    'current_year': datetime.now().year
}

# Mais configurações
EMAIL_FABRICA = 'fabricadesoftware.videira@ifc.edu.br'
GOOGLE_ANALYTICS = os.getenv("GOOGLE_ANALYTICS", "")
SOCIAL_LINKS = [
    ('github', 'https://github.com/fabricaSoftwareVideira'),
    # ('instagram', '#'),
    # ('youtube', '#')
]

# Configuração do sitemap
SITEMAP = {
    'format': 'xml',  # Formato do sitemap: 'xml' ou 'txt'
    'priorities': {
        'articles': 0.7,  # Prioridade para artigos (0.0 a 1.0)
        'pages': 0.5,     # Prioridade para páginas estáticas
        'indexes': 0.3    # Prioridade para índices (tags, categorias, etc.)
    },
    'changefreqs': {
        'articles': 'monthly',  # Frequência de atualização dos artigos
        'pages': 'yearly',      # Frequência de atualização das páginas
        'indexes': 'weekly'     # Frequência de atualização dos índices
    },
    'exclude': ['drafts']  # Opcional: exclui páginas ou seções específicas
}