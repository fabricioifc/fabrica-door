from pelican import signals
import minify_html
from cssmin import cssmin
from jsmin import jsmin
import os
import re

def minify_output(generator):
    output_dir = generator.output_path
    for root, _, files in os.walk(output_dir):
        for file in files:
            file_path = os.path.join(root, file)

            if file.endswith('.html'):
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    minified_content = minify_html.minify(
                        content,
                        remove_processing_instructions=True
                    )
                    # Restaurar type="submit" em botões sem type dentro de formulários
                    minified_content = re.sub(
                        r'<button(?![^>]*type=)([^>]*)>',
                        r'<button type="submit"\1>',
                        minified_content
                    )
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