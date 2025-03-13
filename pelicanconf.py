AUTHOR = 'Fabricio Bizotto'
SITENAME = 'Fabrica Door'
SITEURL = ""

THEME = "/home/fabricio/pelican-themes/mnmlist"
# THEME = "/home/fabricio/pelican-themes/monospace"

PATH = "content"

TIMEZONE = 'America/Sao_Paulo'

DEFAULT_LANG = 'pt-br'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (
    ("Pelican", "https://getpelican.com/"),
    ("Python.org", "https://www.python.org/"),
    ("Jinja2", "https://palletsprojects.com/p/jinja/"),
    ("You can modify those links in your config file", "#"),
)

# Social widget
SOCIAL = (
    ("You can add links in your config file", "#"),
    ("Another social link", "#"),
)

DEFAULT_PAGINATION = False

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True


# Adicione esta linha ao arquivo pelicanconf.py
MENUITEMS = [
    ('Início', '/'),
    ('Sobre', '/sobre'),
    ('Equipe', '/equipe'),
    ('Contato', '/contato'),
]

INDEX_SAVE_AS = 'index.html'
RELATIVE_URLS = True