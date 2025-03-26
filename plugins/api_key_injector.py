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
    email_fabrica = os.environ.get('EMAIL_FABRICA', '')
    
    if not api_key:
        print("AVISO: API_KEY não encontrada no arquivo .env")

    if not email_fabrica:
        print("AVISO: EMAIL_FABRICA não encontrada no arquivo .env")
    
    # Adiciona ao contexto global do Pelican
    pelican.settings['API_KEY'] = api_key
    pelican.settings['EMAIL_FABRICA'] = email_fabrica

def register():
    """Registra o plugin com o Pelican"""
    signals.initialized.connect(load_api_key)