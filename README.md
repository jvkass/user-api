# API de usuários

## Pré-requisitos

Docker, Nodejs e yarn

https://www.docker.com/products/docker-desktop/

https://nodejs.org/en

``npm install --global yarn``

## Padrões utilizados no Projeto

https://docs.google.com/presentation/d/1lmSMY2AZKi0OcrkYT8Ix87mPzZnw0U4DAx_DiUCTA7U/edit?usp=share_link

## Como executar a api na maquina local

#### Subir as instancias necessárias com o comando a seguir no terminal da sua IDE:

``docker compose up -d``

#### Após a execução das instancias baixar o projeto abaixo 

``git clone https://github.com/jvkass/migrator.git``

#### No pasta do projeto migrator foi criado migrations para criação das tabelas no banco de dados, para executar as mesmas, se faz necessário utilizar o comando abaixo:

``npm run typeorm:run-migrations``

#### Após preparar a infra, podemos executar a aplicação, primeiro passo é preparar as variaveis de ambiente, onde já estão especificadas no .env.example criando um arquivo .env

#### após isso deve ser feito o procedimento de baixar as dependencias com o comando a baixo:

``yarn``

#### com a instalação das dependencias pode se executar o projeto com o comando: 

``yarn start:dev``

## OBS: deve se repetir os dois passos anteriores com a API de autenticação

https://github.com/jvkass/auth-api.git

### Domain Errors

  | Error  | Exemplo |
  |---|---|
  |APIE001 | "Email invalido" |
  |APIE002 | "Senha invalida" | 
  |APIE003 | "Usuário não existe"|  
  |APIE004 | "Access Token invalido"|
