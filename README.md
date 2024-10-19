---

## **README - Microsserviço Payment**

---

# Microsserviço: Payment  
Parte do sistema **CompreFácil**

## **Descrição**

Este serviço é responsável por processar pagamentos e publicar mensagens na fila do **RabbitMQ** para comunicação com outros microsserviços, como o **Notification**. Ele armazena dados das transações no banco **Postgres** e trabalha de forma assíncrona para garantir a eficiência do processo.

---

## **Requisitos**

- **Node.js** (v18+)  
- **npm**  
- **Docker** e **Docker Compose**

---

## **Instalação e Execução**

### 1. Clonar o repositório
```bash
git clone https://github.com/AlexandreLiberatto/payment.git
cd payment
```

### 2. Configurar as variáveis de ambiente
Crie um arquivo `.env` com as seguintes configurações:

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=senha_postgres
DB_NAME=payment_db
RABBITMQ_URL=amqp://localhost
```

### 3. Instalar as dependências
```bash
npm install
```

### 4. Subir os containers necessários
Certifique-se de que o **Postgres** e **RabbitMQ** estão rodando. Utilize o Docker Compose com o seguinte comando:

```bash
docker-compose up -d
```

### 5. Iniciar o serviço
```bash
npm start
```

---

## **Rotas Disponíveis**

### `POST /pagamento`
Processa uma nova transação.  

**Exemplo de solicitação:**
```bash
curl -X POST http://localhost:3000/pagamento -H "Content-Type: application/json" -d '{"userId": 1, "amount": 100.00}'
```

---

## **Tecnologias Utilizadas**

- **Node.js**  
- **Postgres**  
- **RabbitMQ**  

---

## **Contato**

- **Nome:** Alexandre Liberato  
- **GitHub:** [Payment](https://github.com/AlexandreLiberatto/payment)  
- **Email:** alexandreliberatto@gmail.com  

---
