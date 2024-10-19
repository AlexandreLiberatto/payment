
---

# Projeto: Microsserviços de Pagamento e Notificação

**Universidade:** UNISENAI SC  
**Disciplina:** Sistemas Móveis e Distribuídos  
**Fase:** 4ª Fase - Curso de Análise e Desenvolvimento de Sistemas  

Este projeto é parte de um desafio acadêmico que visa desenvolver dois microsserviços independentes — **Payment** e **Notification** — para a plataforma e-commerce **CompreFácil**, utilizando conceitos de arquitetura distribuída com **Docker**, **Postgres**, **RabbitMQ** e **Node.js**.

## Estrutura do Projeto

- **payment**: Microsserviço responsável por processar pagamentos e publicar mensagens na fila.  
- **notification**: Microsserviço responsável por ler as mensagens na fila e enviar notificações para o usuário.

---

## **Requisitos**

Certifique-se de ter instalado as seguintes ferramentas:

- **Git**  
- **Docker** e **Docker Compose**  
- **Node.js** (versão 18 ou superior)  
- **npm** (gerenciador de pacotes do Node.js)

---

## **Como baixar e rodar o projeto**

### 1. Clonar o repositório

Abra o terminal e execute o comando abaixo para clonar o repositório:

```bash
git clone https://github.com/AlexandreLiberatto/PagueFacil.git
cd PagueFacil
```

### 2. Subir os containers com Docker Compose

O projeto utiliza **Postgres** para banco de dados e **RabbitMQ** para mensageria. Execute o seguinte comando para iniciar os serviços:

```bash
docker-compose up -d
```

> **Nota:** Certifique-se de que o Docker está em execução no seu sistema.

### 3. Instalar dependências

Entre nos diretórios `payment` e `notification` para instalar as dependências:

```bash
# No serviço de pagamento
cd payment
npm install

# No serviço de notificação
cd ../notification
npm install
```

### 4. Configurar variáveis de ambiente

Crie um arquivo `.env` em cada serviço (**payment** e **notification**) com as seguintes variáveis:  

**Exemplo `.env` para Payment:**

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=senha_postgres
DB_NAME=payment_db
RABBITMQ_URL=amqp://localhost
```

**Exemplo `.env` para Notification:**

```
PORT=3001
RABBITMQ_URL=amqp://localhost
```

### 5. Executar os serviços

Cada serviço precisa ser iniciado individualmente. Em terminais separados, execute os seguintes comandos:

```bash
# No diretório payment
cd payment
npm start

# No diretório notification
cd ../notification
npm start
```

### 6. Testando o fluxo de pagamento e notificação

1. **Realizar transação:**  
   Enviar uma solicitação de pagamento para o serviço **Payment**:
   ```bash
   curl -X POST http://localhost:3000/pagamento -H "Content-Type: application/json" -d '{"userId": 1, "amount": 100.00}'
   ```

2. **Receber notificações:**  
   Acompanhe no console do serviço **Notification** para verificar se as mensagens estão sendo lidas corretamente da fila RabbitMQ e as notificações estão sendo simuladas.

---

## **Portas Utilizadas**

O projeto utiliza as seguintes portas para comunicação entre os serviços:

- **PostgreSQL**: 
  - Porta **5432** para conexão com o banco de dados.
  
- **PgAdmin**: 
  - Porta **15432** para acessar a interface do PgAdmin.
  
- **RabbitMQ**:
  - Porta **5672** para comunicação de mensagens.
  - Porta **15672** para acessar a interface de gerenciamento do RabbitMQ.

- **Serviço de Pagamento**: 
  - Porta **3000** para API REST do serviço de pagamento.

- **Serviço de Notificação**: 
  - Porta **3001** para API REST do serviço de notificação.

---

## **Arquitetura do Sistema**

O fluxo de comunicação é assíncrono e distribuído da seguinte forma:

1. O serviço **Payment** armazena os dados da transação com status **pendente**.
2. **Payment** publica uma mensagem na fila do RabbitMQ para informar a criação da transação.
3. O serviço **Notification** lê a mensagem e envia uma notificação de confirmação de recebimento.
4. O **Payment** confirma a transação e atualiza o status para **sucesso**.
5. **Payment** publica outra mensagem na fila para notificar o usuário sobre o sucesso da transação.
6. O **Notification** lê a mensagem e envia uma notificação ao usuário sobre a confirmação final.

---

## **Tecnologias Utilizadas**

- **Node.js**: Backend e APIs REST.  
- **Postgres**: Banco de dados para armazenar informações de transações.  
- **RabbitMQ**: Sistema de mensageria para comunicação entre serviços.  
- **Docker Compose**: Orquestração dos containers de banco de dados e RabbitMQ.  

---

## **Possíveis Problemas e Soluções**

- **Erro de conexão com RabbitMQ ou Postgres:**  
  Verifique se os containers estão rodando corretamente com o comando:
  ```bash
  docker ps
  ```

- **Porta em uso:**  
  Se as portas `3000` ou `3001` estiverem em uso, altere a configuração no `.env` ou pare os serviços que estão utilizando essas portas.

---

## **Contribuições**

Contribuições são bem-vindas! Sinta-se à vontade para abrir **issues** ou enviar **pull requests** com melhorias e correções.

---

## **Licença**

Este projeto é apenas para fins educacionais e faz parte do desafio da disciplina de **Sistemas Móveis e Distribuídos**.

---

## **Contato**

Em caso de dúvidas, entre em contato:

- **Nome:** Alexandre Liberato  
- **Email:** alexandreliberatto@gmail.com  
- **GitHub:** [AlexandreLiberatto](https://github.com/AlexandreLiberatto/PagueFacil/)  
- **Portfólio:** [Portfolio de Alexandre](https://portfolio-alexandre-jade.vercel.app/)  
- **LinkedIn:** [Alexandre Liberato](https://www.linkedin.com/in/alexandre-liberato-32179624b/)  
- **WhatsApp:** [Enviar Mensagem](https://api.whatsapp.com/send/?phone=5548991604054&text&type=phone_number&app_absent=0)  

---

## **Agradecimentos**

Agradecimentos à **UNISENAI SC** e ao professore Thiago Roberto Mendes por fornecerer um desafio enriquecedor.

---
