# 📚 Documentação da API RushX

## Base URL
- **Desenvolvimento:** `http://localhost:3000`
- **Produção:** `https://api.rushx.app`

---

## 🔑 Autenticação

Todas as requisições (exceto login e registro) exigem header:
```
Authorization: Bearer <seu_jwt_token>
```

---

## 👤 Auth Endpoints

### 1. Registro
```
POST /auth/register
Content-Type: application/json

{
  "phoneNumber": "+244923123456",
  "name": "João Silva",
  "userType": "client" // ou "biker"
}

Response 201:
{
  "success": true,
  "message": "SMS enviado para seu número",
  "sessionId": "session_123"
}
```

### 2. Verificar SMS
```
POST /auth/verify-sms
Content-Type: application/json

{
  "sessionId": "session_123",
  "code": "123456"
}

Response 200:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_123",
    "phoneNumber": "+244923123456",
    "name": "João Silva",
    "userType": "client"
  }
}
```

### 3. Login
```
POST /auth/login
Content-Type: application/json

{
  "phoneNumber": "+244923123456"
}

Response 200:
{
  "success": true,
  "message": "SMS enviado",
  "sessionId": "session_456"
}
```

### 4. Obter Perfil
```
GET /auth/profile
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "user": {
    "_id": "user_123",
    "phoneNumber": "+244923123456",
    "name": "João Silva",
    "email": "joao@email.com",
    "userType": "client",
    "profile": {
      "avatar": "https://...",
      "verified": true,
      "rating": 4.8
    },
    "createdAt": "2026-05-14T10:00:00Z"
  }
}
```

### 5. Atualizar Perfil
```
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com"
}

Response 200:
{
  "success": true,
  "user": { ... }
}
```

---

## 📦 Order Endpoints

### 1. Criar Pedido
```
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "pickup": {
    "location": "Rua 21 de Janeiro, Benguela",
    "latitude": -8.8383,
    "longitude": 13.2344
  },
  "delivery": {
    "location": "Avenida Samora Machel, Benguela",
    "latitude": -8.8410,
    "longitude": 13.2380
  },
  "orderType": "document",
  "deliveryType": "express",
  "description": "Documento importante",
  "weight": 0.5
}

Response 201:
{
  "success": true,
  "order": {
    "_id": "order_123",
    "clientId": "user_123",
    "status": "pending",
    "estimatedPrice": 500,
    "distance": 2.5,
    "estimatedTime": 15,
    "createdAt": "2026-05-14T10:00:00Z"
  }
}
```

### 2. Listar Pedidos
```
GET /orders?status=pending&limit=10&page=1
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "orders": [...],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

### 3. Obter Detalhes do Pedido
```
GET /orders/:orderId
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "order": {
    "_id": "order_123",
    "clientId": "user_123",
    "bikerId": "user_456",
    "status": "in_progress",
    "pickup": { ... },
    "delivery": { ... },
    "estimatedPrice": 500,
    "finalPrice": 520,
    "createdAt": "2026-05-14T10:00:00Z",
    "acceptedAt": "2026-05-14T10:02:00Z"
  }
}
```

### 4. Aceitar Pedido (Motoqueiro)
```
PUT /orders/:orderId/accept
Authorization: Bearer <token>
Content-Type: application/json

{}

Response 200:
{
  "success": true,
  "message": "Pedido aceito com sucesso",
  "order": { ... }
}
```

### 5. Recusar Pedido
```
PUT /orders/:orderId/reject
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Localização muito longe"
}

Response 200:
{
  "success": true,
  "message": "Pedido recusado"
}
```

---

## 💳 Payment Endpoints

### 1. Processar Pagamento
```
POST /payments/process
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderId": "order_123",
  "amount": 500,
  "paymentMethod": "express"
}

Response 201:
{
  "success": true,
  "payment": {
    "_id": "payment_123",
    "status": "completed",
    "amount": 500,
    "createdAt": "2026-05-14T10:00:00Z"
  }
}
```

### 2. Obter Status do Pagamento
```
GET /payments/:paymentId
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "payment": { ... }
}
```

### 3. Levantar Dinheiro (Motoqueiro)
```
POST /payments/withdraw
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 5000,
  "accountNumber": "123456789",
  "bank": "BPC"
}

Response 201:
{
  "success": true,
  "withdrawal": {
    "_id": "withdraw_123",
    "amount": 5000,
    "status": "pending",
    "createdAt": "2026-05-14T10:00:00Z"
  }
}
```

### 4. Obter Carteira
```
GET /wallets/:userId
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "wallet": {
    "_id": "wallet_123",
    "userId": "user_456",
    "balance": 12500,
    "totalEarned": 50000,
    "totalWithdrawn": 37500
  }
}
```

---

## 📍 Tracking Endpoints

### 1. Obter Localização Atual
```
GET /tracking/:orderId
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "tracking": {
    "orderId": "order_123",
    "bikerId": "user_456",
    "currentLocation": {
      "latitude": -8.8390,
      "longitude": 13.2355,
      "timestamp": "2026-05-14T10:05:30Z"
    },
    "estimatedArrival": "2026-05-14T10:15:00Z",
    "status": "in_progress"
  }
}
```

### 2. Atualizar Localização (Motoqueiro)
```
POST /tracking/:orderId/location
Authorization: Bearer <token>
Content-Type: application/json

{
  "latitude": -8.8390,
  "longitude": 13.2355
}

Response 200:
{
  "success": true,
  "message": "Localização atualizada"
}
```

### 3. Obter Rota Completa
```
GET /tracking/:orderId/route
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "route": [
    { "latitude": -8.8383, "longitude": 13.2344, "timestamp": "2026-05-14T10:00:00Z" },
    { "latitude": -8.8390, "longitude": 13.2355, "timestamp": "2026-05-14T10:05:00Z" }
  ]
}
```

---

## WebSocket (Socket.IO)

### Conexão
```javascript
const socket = io('http://localhost:3004', {
  auth: {
    token: 'seu_jwt_token'
  }
});
```

### Eventos

**Cliente envia:**
```javascript
socket.emit('biker-location-update', {
  orderId: 'order_123',
  latitude: -8.8390,
  longitude: 13.2355
});

socket.emit('order-status-update', {
  orderId: 'order_123',
  status: 'in_progress'
});
```

**Servidor emite:**
```javascript
socket.on('biker-location', (data) => {
  console.log(data);
});

socket.on('order-status', (data) => {
  console.log(data);
});

socket.on('eta', (data) => {
  console.log(data);
});
```

---

## ❌ Error Handling

Todas as respostas de erro seguem este formato:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Campo obrigatório ausente",
    "details": { "field": "phoneNumber" }
  }
}
```

**Códigos de erro comuns:**
- `INVALID_REQUEST` (400) - Dados inválidos
- `UNAUTHORIZED` (401) - Token ausente ou inválido
- `FORBIDDEN` (403) - Sem permissão
- `NOT_FOUND` (404) - Recurso não encontrado
- `CONFLICT` (409) - Conflito (ex: telefone já registrado)
- `SERVER_ERROR` (500) - Erro do servidor

---

## 🧪 Testando com cURL

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+244923123456", "name": "João", "userType": "client"}'

curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+244923123456"}'

curl -X POST http://localhost:3000/orders \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{ ... }'
```

---

## 📈 Rate Limiting

- **Limite:** 100 requisições por minuto
- **Header retornado:** `X-RateLimit-Remaining`

---

## 🔄 Versionamento

API atual: **v1**
Futuras: `/api/v2`, etc
