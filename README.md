# My Identity

**My Identity** é um sistema de autenticação focado em segurança, projetado para gerenciar sessões de usuários de forma eficiente, com funcionalidades de renovação automática de tokens e proteção contra acessos não autorizados.

## Funcionalidades

- 🔒 **Autenticação Segura**: Uso de JWT para login e logout de usuários.
- 🚪 **Login e Logout Simples**: Fácil autenticação e encerramento de sessões.
- 🔐 **Renovação Automática de Tokens**: Mantém a sessão ativa renovando o token automaticamente.
- 🛡️ **Proteção de Rotas**: Verificação de autorização em rotas protegidas.
- 🔄 **Verificação de Sessão**: Checa e renova o token automaticamente, proporcionando uma navegação contínua sem a necessidade de re-login.
- 📂 **API Segura**: Utilização de tokens JWT para proteger as requisições API.

---

## Requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados:

- **Node.js** v14+ (instalar [aqui](https://nodejs.org/))
- **Yarn** ou **npm** (dependendo de sua preferência)
- **PostgreSQL** (ou outro banco de dados suportado pelo Prisma)
- **Prisma CLI** (para gerenciar o banco de dados)

---

## Como Rodar o Projeto

### 1. Clonar o Repositório

Clone o repositório e entre no diretório do projeto.

### 2. Instalar Dependências

Instale as dependências do front-end (Next.js) e do back-end (NestJS):

- **Front-end (Next.js)**: Navegue até o diretório frontend e instale as dependências.
- **Back-end (NestJS)**: Navegue até o diretório backend e instale as dependências.

---

### 3. Configuração do Banco de Dados

Crie um arquivo `.env` no diretório do backend com as configurações do banco de dados. Aqui está um exemplo:
DATABASE_URL="postgresql://username
@localhost:5432/my_identity" JWT_SECRET="sua_chave_secreta"

Substitua `username`, `password` e `localhost` pelos valores apropriados de seu ambiente.

---

### 4. Rodar Migrações Prisma

- **Configurar Prisma**: Na pasta `backend`, adicione a URL do banco de dados ao arquivo `.env` como mostrado acima.
- **Rodar as Migrações**: Para criar as tabelas no banco de dados, rode o comando `npx prisma migrate dev --name init`.

Isso aplicará as migrações do banco de dados e criará as tabelas necessárias.

---

### 5. Executar o Projeto

- **Front-end (Next.js)**: No diretório `frontend`, inicie o servidor de desenvolvimento.
- **Back-end (NestJS)**: No diretório `backend`, inicie o servidor.

O projeto estará acessível em `http://localhost:3000` para o front-end e em `http://localhost:8000` para o back-end.

---

### 6. Testar a Aplicação

Agora, você pode acessar a aplicação em `http://localhost:3000`. Ao fazer login, as funcionalidades de autenticação, renovação de token e proteção de rotas estarão disponíveis.

---

## Tecnologias Utilizadas

- **Next.js**: Front-end do projeto.
- **NestJS**: Back-end do projeto.
- **Prisma**: ORM para manipulação do banco de dados.
- **PostgreSQL**: Banco de dados utilizado (pode ser substituído por outro compatível com Prisma).
- **JWT**: JSON Web Token para autenticação segura.

---

## Comandos Úteis

- **Executar Migrações do Prisma**: Para aplicar novas migrações no banco de dados, use o comando `npx prisma migrate dev --name nome_da_migracao`.
- **Sincronizar o Prisma**: Para atualizar o banco de dados sem criar uma nova migração, use `npx prisma db push`.
- **Resetar o Banco de Dados**: Use `npx prisma migrate reset` para resetar o banco de dados.


