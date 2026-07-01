<h1 align="center">
📌 TaskFlow
</h1>

<p align="center">
Sistema Web para Gerenciamento Inteligente de Tarefas
</p>

<p align="center">

<a href="#-sobre-o-projeto">Sobre</a> •
<a href="#-funcionalidades">Funcionalidades</a> •
<a href="#-tecnologias">Tecnologias</a> •
<a href="#-instalação">Instalação</a> •
<a href="#-estrutura-do-projeto">Estrutura</a> •
<a href="#-requisitos-funcionais">RF</a> •
<a href="#-requisitos-não-funcionais">RNF</a> •
<a href="#-testes">Testes</a> •
<a href="#-links">Links</a>

</p>

---

# 📖 Sobre o Projeto

O **TaskFlow** é um sistema web desenvolvido para auxiliar usuários na organização da rotina através do gerenciamento de tarefas recorrentes e pontuais.

O sistema permite criar atividades diárias, semanais, mensais ou únicas, acompanhar o progresso através de indicadores e administrar usuários por meio de um painel exclusivo para administradores.

O projeto foi desenvolvido durante a disciplina de **Engenharia de Software**, aplicando conceitos de arquitetura, organização de código, qualidade de software e boas práticas de desenvolvimento.

---

# 🚀 Funcionalidades

## 🔐 Autenticação

- Cadastro de usuários
- Login
- Logout
- Criptografia de senha (password_hash)
- Controle de sessão
- Controle de permissões (Administrador e Usuário)

---

## 📝 Gerenciamento de tarefas

Cada tarefa pode possuir:

- Nome
- Descrição
- Horário
- Frequência

Tipos de frequência disponíveis:

- Única
- Diária
- Semanal
- Mensal

Também é possível:

- Editar tarefas
- Excluir tarefas
- Marcar conclusão
- Histórico de conclusões

---

## 📊 Dashboard

O Dashboard apresenta:

- Tarefas do dia
- Próximas tarefas
- Cards informativos
- Resumo da rotina

---

## 📈 Página de Progresso

A página de progresso apresenta indicadores calculados dinamicamente:

- Total de tarefas concluídas
- Quantidade de tarefas do período
- Taxa média de conclusão
- Melhor dia da semana
- Gráfico de desempenho

Os filtros disponíveis são:

- Hoje
- Semana
- Mês

---

## 👑 Área Administrativa

A área administrativa permite:

- Visualizar usuários cadastrados
- Bloquear/desbloquear usuários
- Excluir usuários
- Visualizar quantidade de tarefas por usuário

O acesso é restrito apenas para usuários com perfil **Administrador**.

---

# 🏗 Tecnologias

## Front-end

- React
- React Router
- React Recharts
- Styled Components
- Lucide React
- Sonner
- Axios

---

## Back-end

- PHP 8

---

## Banco de Dados

- MySQL

---

## Ferramentas

- Vite
- XAMPP
- phpMyAdmin

---

# 📦 Instalação

## 1. Clone o projeto

```bash
git clone https://github.com/seuusuario/taskflow.git
```

---

## 2. Instale as dependências

```bash
npm install
```

---

## 3. Bibliotecas utilizadas

```bash
npm install

npm install axios

npm install react-router-dom

npm install styled-components

npm install lucide-react

npm install sonner

npm install recharts
```

---

## 4. Configure o banco

Crie um banco MySQL chamado

```
taskflow
```

Importe o script SQL do projeto.

---

## 5. Configure o backend

Utilize o XAMPP e coloque a pasta do backend em:

```
htdocs/
```

Configure as credenciais do banco em

```
config/database.php
```

---

## 6. Execute

Frontend

```bash
npm run dev
```

Backend

```
Apache + MySQL (XAMPP)
```

---

# 📂 Estrutura do Projeto

```
src
│
├── components
│
├── hooks
│
├── layouts
│
├── pages
│
├── services
│
├── styles
│
├── utils
│
└── router

backend
│
├── auth
├── tasks
├── progress
├── admin
└── config
```

---

# 📋 Requisitos Funcionais

**RF01** – Permitir cadastro de usuários.

**RF02** – Permitir autenticação por login.

**RF03** – Permitir criação de tarefas.

**RF04** – Permitir edição de tarefas.

**RF05** – Permitir exclusão de tarefas.

**RF06** – Permitir definir recorrência da tarefa.

**RF07** – Permitir concluir tarefas.

**RF08** – Exibir tarefas do usuário.

**RF09** – Gerar indicadores de progresso.

**RF10** – Possuir perfil Administrador.

**RF11** – Permitir bloqueio de usuários.

**RF12** – Permitir exclusão de usuários.

---

# 📋 Requisitos Não Funcionais

**RNF01** – Interface responsiva.

**RNF02** – Senhas armazenadas criptografadas.

**RNF03** – Organização modular do código.

**RNF04** – Comunicação Frontend/Backend via API.

**RNF05** – Persistência em banco MySQL.

**RNF06** – Código organizado seguindo boas práticas.

---

# 📚 Documentação

Modelo C4

https://docs.google.com/document/d/17f2PVuOm84QrsEiIe9tt2iVzr5U_io2kb9HyUzpglsM/edit?usp=sharing

---

# 👨‍💻 Autor

**Pedro Henrique Coppola**

[LinkedIn](https://www.linkedin.com/in/pedro-henrique-coppola-071baa225/)

[Instagram](https://www.instagram.com/pedrocoppola_/)

---

# 📄 Licença

Projeto desenvolvido para fins acadêmicos durante a disciplina de Engenharia de Software.
