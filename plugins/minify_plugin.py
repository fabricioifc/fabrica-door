from pelican import signals
from htmlmin import minify as minify_html
from cssmin import cssmin
from jsmin import jsmin
import os

def minify_output(generator):
    output_dir = generator.output_path
    for root, _, files in os.walk(output_dir):
        for file in files:
            file_path = os.path.join(root, file)

            # Minificar HTML
            if file.endswith('.html'):
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    minified_content = minify_html(content, remove_comments=True, remove_empty_space=True)
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(minified_content)
                except Exception as e:
                    print(f"Erro ao minificar {file_path}: {e}")

            # Minificar CSS
            elif file.endswith('.css'):
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    minified_content = cssmin(content)
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(minified_content)
                except Exception as e:
                    print(f"Erro ao minificar {file_path}: {e}")

            # Minificar JavaScript
            elif file.endswith('.js'):
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    minified_content = jsmin(content)
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(minified_content)
                except Exception as e:
                    print(f"Erro ao minificar {file_path}: {e}")

def register():
    signals.finalized.connect(minify_output)