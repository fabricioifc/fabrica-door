import os
from pelican import main as pelican_main
from wsgiref.simple_server import make_server
from wsgiref.handlers import SimpleHandler

# Configurações a partir de variáveis de ambiente
CONTENT_PATH = os.getenv("CONTENT_PATH", "content")
OUTPUT_PATH = os.getenv("OUTPUT_PATH", "output")
CONFIG_FILE = os.getenv("CONFIG_FILE", "pelicanconf.py")
PORT = os.getenv("GUNICORN_PORT", 8000)

# Gera o site uma vez na inicialização
def generate_site():
    pelican_main([CONTENT_PATH, "-o", OUTPUT_PATH, "-s", CONFIG_FILE])

# Aplicativo WSGI para servir arquivos estáticos
def application(environ, start_response):
    path = environ.get("PATH_INFO", "/").lstrip("/")
    if not path:
        path = "index.html"
    
    file_path = os.path.join(OUTPUT_PATH, path)
    if not os.path.exists(file_path) or not os.path.isfile(file_path):
        status = "404 Not Found"
        response_headers = [("Content-type", "text/plain")]
        start_response(status, response_headers)
        return [b"404 - File Not Found"]

    with open(file_path, "rb") as f:
        content = f.read()
    
    content_type = "text/html" if file_path.endswith(".html") else "text/css" if file_path.endswith(".css") else "application/octet-stream"
    status = "200 OK"
    response_headers = [("Content-type", content_type)]
    start_response(status, response_headers)
    return [content]

# Gera o site ao iniciar
if __name__ == "__main__":
    generate_site()
    with make_server("", PORT, application) as httpd:
        print(f"Serving on port {PORT}...")
        httpd.serve_forever()
else:
    generate_site()  # Gera o site quando rodado pelo Gunicorn