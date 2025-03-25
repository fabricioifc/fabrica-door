# plugins/api_key_injector.py
import os
from pelican import signals
from dotenv import load_dotenv

def load_api_key(pelican):
    """Carrega a API_KEY do arquivo .env e adiciona ao contexto do Pelican"""
    # Carrega variáveis do arquivo .env
    load_dotenv()
    
    # Obtém a API_KEY do ambiente
    api_key = os.environ.get('API_KEY', '')
    
    if not api_key:
        print("AVISO: API_KEY não encontrada no arquivo .env")
    
    # Adiciona ao contexto global do Pelican
    pelican.settings['API_KEY'] = api_key

def register():
    """Registra o plugin com o Pelican"""
    signals.initialized.connect(load_api_key)