# Acervo histórico

Página inicial do projeto.

<div align="center">
	<img src="https://github.com/bombinideh/library/assets/72027449/e5699a3a-bfb9-4cfb-af91-16aa9820b22c
"
	alt="Visualização da página inicial do projeto" />
</div>

## 🔎 Visão geral

Este projeto tem como objetivo central organizar o acervo histórico do Centro Espírita Amor e Caridade (CEAC) de forma acessível e prática. A plataforma oferece a oportunidade de catalogar e visualizar informações detalhadas sobre livros, estantes, caixas e outros elementos presentes no acervo. A intenção é facilitar o acesso e contribuição de dados, tornando a experiência de pesquisa e consulta mais intuitiva e valiosa para os membros da instituição e demais interessados.

## 💾 Diagrama entidade relacionamento

Confira pelo [DrawSQL](https://github.com/bombinideh/library/assets/72027449/47a6d7d1-3917-470b-8400-2a4591d068ae).

<div align="center">
	<img src="https://github.com/bombinideh/library/assets/72027449/47a6d7d1-3917-470b-8400-2a4591d068ae
"
	alt="Diagrama entidade relacionamento" />
</div>

## 🖥️ UI Design

Confira pelo [Figma](https://www.figma.com/file/1dPhUMg46mI1czPWzq5eZF/library-layout?type=design&node-id=3%3A2&mode=design&t=0j5RBuB7O7YKI59o-1).

<div align="center">
	<img src="https://github.com/bombinideh/library/assets/72027449/ac68d63e-4118-40e2-ab14-6f781436a5de"
	alt="Diagrama entidade relacionamento" />
</div>

## 🚀 Instalação

### Node.js e NPM

O [npm](https://www.npmjs.com/) é usado para gerenciar pacotes / bibliotecas vinculados ao projeto. Execute a [instalação do Node.js](https://nodejs.org/en/download/current) que já possui o npm como gerenciador de pacotes padrão.

### Docker

Neste projeto, o Docker fará o processo de criação e armazenamento do banco de dados. Execute a [instalação do Docker](https://www.docker.com/products/docker-desktop/).

## 🚀 Rode o projeto

Com o Docker aberto, abra um terminal bash / zsh na raiz do projeto. 

Define as variáveis de ambiente no arquivo "server/.env" recém criado utilizando os exemplos do arquivo copiado:
```bash
  cp server/.env.example server/.env
```

Instale as dependências do front-end e back-end com:

```bash
  cd client && npm install && cd ../server && npm install
```

Crie e inicialize o banco de dados:

```bash
  docker compose up -d && npm run migrate-latest
```

Rode o projeto:

```bash
  npm run dev && cd ../client && npm run dev
```

Você conseguirá acessar pelo seu navegador: [http://localhost:5173/](http://localhost:5173/)

## 💻 Principais tecnologias / recursos

### 🖥️ Front-end

- [React](https://react.dev/) - biblioteca front-end
- [TanStack Query](https://tanstack.com/query/v3/) - requisições HTTP e gerenciamento de cache
- [styled-components](https://styled-components.com/) - CSS-in-JS

### 💾 Back-end

- [Node.js](https://nodejs.org/en) - interpretador do JavaScript fora do cliente
- [Express](https://expressjs.com/pt-br/) - framework para construção da API REST
- [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken) - autenticação
- [PostgreSQL](https://www.postgresql.org/) - banco de dados relacional
- [Knex.js](https://knexjs.org/) - SQL builder
