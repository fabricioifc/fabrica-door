# SFS - Sistema da Fábrica de Software do IFC Videira

## O que é o SFS?

O SFS é um sistema estático feito para divulgar os projetos desenvolvidos pela Fábrica de Software do IFC Videira, bem como as informações sobre a equipe e formas de contato.

## Como acessar o SFS?

Para acessar o SFS, basta acessar o endereço [https://fsw-ifc.brdrive.net/](https://fsw-ifc.brdrive.net/).

## Quem desenvolveu o SFS?

O SFS foi desenvolvido pela equipe da Fábrica de Software do IFC Videira.

## Quem mantém o SFS?

O SFS é mantido pela equipe da Fábrica de Software do IFC Videira.

## Quais tecnologias foram utilizadas no desenvolvimento do SFS?

![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/-Flask-000000?style=flat-square&logo=flask&logoColor=white)
![Pelican](https://img.shields.io/badge/-Pelican-00A98F?style=flat-square&logo=pelican&logoColor=white)
![Markdown](https://img.shields.io/badge/-Markdown-000000?style=flat-square&logo=markdown&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github&logoColor=white)

## Como contribuir com o SFS?

Para contribuir com o SFS, basta seguir os passos abaixo:

1. Faça um fork do repositório.
2. Clone o repositório para a sua máquina.
3. Faça as alterações necessárias.
4. Faça um commit das alterações.
5. Faça um push das alterações.
6. Crie um pull request.
7. Aguarde a análise e aprovação da equipe.
8. Pronto! Sua contribuição será avaliada e, se aprovada, será incorporada ao SFS.

## Como rodar o SFS localmente?

Para rodar o SFS localmente, basta seguir os passos abaixo:

1. Clone o repositório para a sua máquina.
2. Instale o [Docker](https://www.docker.com/).
3. Altere o arquivo `.env.sample` para `.env` e altere as variáveis de ambiente conforme necessário.

> **Nota:** No arquivo `.env`, a variável `API_KEY` é usada internamente para proteger a API que envia e-mails. Assim, você não conseguirá usar o formulário de envio de e-mails. Se quiser usar o formulário de envio de e-mails, altere a lógica da aplicação e use outra estraatégia para enviar e-mails.

4. Executar o script `deploy.sh` para subir o ambiente com o seguinte comando:

```bash
$ ./deploy.sh dev
```

5. Acesse o endereço [http://localhost:8000/](http://localhost:8000/).

## Como rodar o SFS localmente sem Docker no Linux?

Para rodar o SFS localmente sem Docker, basta seguir os passos abaixo:

1. Clone o repositório para a sua máquina.
2. Instale o [Python](https://www.python.org/).
3. Instale a biblioteca `virtualenv`. (de acordo com o seu sistema operacional)
4. Altere o arquivo `.env.sample` para `.env` e altere as variáveis de ambiente conforme necessário.
5. Crie um ambiente virtual chamado `.venv`:

```bash
$ python -m venv .venv
```

6. Ative o ambiente virtual:

```bash
$ source .venv/bin/activate
```

7. Instale as dependências do projeto:

```bash
$ pip install -r requirements.txt
```

8. Execute o script para rodar o servidor com a biblioteca `pelican`:

```bash
$ pelican -r -l
```

9. Acesse o endereço [http://localhost:8000/](http://localhost:8000/).

## Considerações finais

O SFS é um projeto de código aberto e está disponível para uso e contribuição de todos. Sinta-se à vontade para contribuir com o projeto e ajudar a melhorar o sistema.
