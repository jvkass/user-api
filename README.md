# API de usuários

## Como executar a api na maquina local

#### Subir as instancias necessárias com o comando a seguir:

docker compose up -d

#### Após a execução das instancias baixar o projeto abaixo 

git clone https://github.com/jvkass/migrator.git

#### No projeto migrator foi criado migrations para criação das tabelas no banco de dados, para executar as mesmas, se faz necessário utilizar o comando abaixo:

npm run typeorm:run-migrations

#### Após preparar a infra, podemos executar a aplicação, primeiro passo é preparar as variaveis de ambiente, onde já estão especificadas no .env.example criando um arquivo .env

#### após isso deve ser feito o procedimento de baixar as dependencias com o comando a baixo:

yarn

#### com a instalação das dependencias pode se executar o projeto com o comando: 

yarn start:dev

### Domain Errors

  APIE001 = "Email invalido"
  APIE002 = "Senha invalida"  
  APIE003 = "Usuário não existe"  
  APIE004 = "Access Token invalido"