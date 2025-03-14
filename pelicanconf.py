#!/usr/bin/env python
# -*- coding: utf-8 -*- #

AUTHOR = 'Fábrica de Software Educativa'
SITENAME = 'Fábrica de Software Educativa'
SITEURL = ''

PATH = 'content'
STATIC_PATHS = ['images']
PAGE_PATHS = ['pages']
ARTICLE_PATHS = []

TIMEZONE = 'America/Sao_Paulo'
DEFAULT_LANG = 'pt-br'

# Tema customizado
# THEME = 'themes/monospace'
THEME = 'themes/fabrica'

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
PLUGINS = []

# Configurações adicionais
DEFAULT_PAGINATION = False

from datetime import datetime

JINJA_GLOBALS = {
    'current_year': datetime.now().year
}