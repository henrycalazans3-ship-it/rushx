# 🏗️ Arquitetura RushX

## Visão Geral

RushX utiliza uma arquitetura de **microserviços** com um **API Gateway** central. Cada serviço é independente e comunicam-se via HTTP REST e WebSocket.

```
┌────────────────────────────────────────────────────────────┐
│                    CLIENTE MOBILE                        │
│              (React Native / Flutter)                    │
└────────────────────────────┬────────────────────────────┘
                     │
                     ▼
        ┌──────────────────────────┐
        │    API GATEWAY         │
        │   (Express.js)         │
        │    Porta: 3000         │
        └──────────┬────┬────┬────┬────────────┘
             │   │   │   │
      ┌──────┴───┘   │   │   └──────────────────┐
      │          │   │               │
      ▼          ▼   ▼               ▼
   ┌─────┐  ┌──────┐  ┌────────┐  ┌──────────┐
   │USER │  │ORDER │  │PAYMENT │  │TRACKING │
   │SVC  │  │ SVC  │  │  SVC   │  │   SVC   │
   │3001 │  │ 3002 │  │  3003  │  │  3004   │
   └──┬──┘  └──┬───┘  └────┬───┘  └────┬────┘
      │        │          │           │
      │        │          │       ┌────┴──────┐
      └────┬───┴──────┬───┴───────┤           │
           │          │          │           │
           ▼          ▼          ▼           ▼
       ┌─────────────────────────────┐   ┌──────────────┐
       │      MongoDB            │   │    Redis     │
       │   (4 databases)         │   │   (Cache)    │
       └─────────────────────────┘   └──────────────┘
```

---

## 💡 Serviços

### 1. API Gateway (Porta 3000)
**Responsabilidade:** Orquestrador central

- ✅ Roteamento de requisições
- ✅ Autenticação JWT
- ✅ Validação de requests
- ✅ Rate limiting
- ✅ Logging centralizado
- ✅ CORS e segurança

**Stack:**
- Express.js
- JWT (jsonwebtoken)
- Axios (HTTP client)

---

### 2. User Service (Porta 3001)
**Responsabilidade:** Autenticação e perfis de usuários

**Features:**
- ✅ Registro (Cliente / Motoqueiro)
- ✅ Login com número de telefone
- ✅ Verificação SMS
- ✅ Gerenciar perfil
- ✅ Upload foto de perfil
- ✅ Verificação de identidade

**Database:** `rushx-users`

**Collections:**
```
users
├── _id
├── phoneNumber
├── name
├── email
├── userType (client / biker)
├── profile
│   ├── avatar
│   ├── verified
│   └── rating
├── createdAt
└── updatedAt
```

**Endpoints:**
```
POST   /auth/register
POST   /auth/login
POST   /auth/verify-sms
GET    /auth/profile
PUT    /auth/profile
POST   /auth/upload-avatar
```

---

### 3. Order Service (Porta 3002)
**Responsabilidade:** Gerenciamento de pedidos de entrega

**Features:**
- ✅ Criar pedido
- ✅ Listar pedidos disponíveis
- ✅ Aceitar/Recusar entrega
- ✅ Atualizar status
- ✅ Histórico de entregas

**Database:** `rushx-orders`

**Collections:**
```
orders
├── _id
├── clientId
├── bikerId
├── pickup
│   ├── location
│   ├── latitude
│   └── longitude
├── delivery
│   ├── location
│   ├── latitude
│   └── longitude
├── orderType (document / package / food)
├── deliveryType (express / normal / economy)
├── status (pending / accepted / in_progress / delivered / cancelled)
├── estimatedPrice
├── finalPrice
├── distance
├── estimatedTime
├── createdAt
├── acceptedAt
├── completedAt
└── updatedAt
```

**Endpoints:**
```
POST   /orders
GET    /orders
GET    /orders/:id
PUT    /orders/:id/accept
PUT    /orders/:id/reject
PUT    /orders/:id/status
GET    /orders/client/:clientId
GET    /orders/biker/:bikerId
```

---

### 4. Payment Service (Porta 3003)
**Responsabilidade:** Processamento de pagamentos

**Features:**
- ✅ Pagamento express (online)
- ✅ Pagamento em dinheiro
- ✅ Gerenciar carteira
- ✅ Levantar dinheiro (withdraw)
- ✅ Histórico de transações

**Database:** `rushx-payments`

**Collections:**
```
payments
├── _id
├── orderId
├── userId
├── amount
├── paymentMethod (express / cash / wallet)
├── status (pending / completed / failed)
├── transactionId
├── createdAt
└── updatedAt

wallets
├── _id
├── userId
├── balance
├── totalEarned
├── totalWithdrawn
└── updatedAt
```

**Endpoints:**
```
POST   /payments/process
GET    /payments/:id
POST   /payments/withdraw
GET    /wallets/:userId
GET    /transactions/:userId
```

---

### 5. Tracking Service (Porta 3004)
**Responsabilidade:** Rastreamento real-time com WebSocket

**Features:**
- ✅ Atualizar localização do motoqueiro
- ✅ Emitir localização em tempo real
- ✅ Status da entrega em tempo real
- ✅ ETA (Estimated Time of Arrival)
- ✅ Histórico de localizações

**Database:** `rushx-tracking`

**Cache:** Redis

**Collections:**
```
tracking_sessions
├── _id
├── orderId
├── bikerId
├── clientId
├── startTime
├── endTime
└── route: []
   └── { lat, lng, timestamp }
```

**WebSocket Events:**
```
# Cliente envia
biker-location-update: { orderId, latitude, longitude, timestamp }
order-status-update: { orderId, status }

# Servidor emite
biker-location: { bikerId, latitude, longitude, timestamp }
order-status: { orderId, status, updatedAt }
eta: { orderId, estimatedTime }
```

**Endpoints:**
```
GET    /tracking/:orderId
POST   /tracking/:orderId/location
GET    /tracking/:orderId/route
WS     /socket.io
```

---

## 🔐 Autenticação

**Fluxo:**

1. Cliente faz login → User Service gera JWT
2. API Gateway valida JWT em cada request
3. Token incluso no header: `Authorization: Bearer <token>`
4. Serviços confiam no token validado pelo Gateway

**JWT Payload:**
```json
{
  "userId": "123456",
  "phoneNumber": "+244923123456",
  "userType": "client",
  "iat": 1234567890,
  "exp": 1234567890
}
```

---

## 🌐 Comunicação entre Serviços

**HTTP REST:**
- User Service → Order Service: Validar dados do cliente
- Order Service → Tracking Service: Iniciar rastreamento
- Payment Service → Order Service: Confirmar pagamento

**WebSocket (Socket.IO):**
- Tracking Service emite para clientes: Localização do motoqueiro
- Clientes recebem atualizações em tempo real

---

## 📊 Databases

**MongoDB:**
- `rushx-users` - Perfis e autenticação
- `rushx-orders` - Pedidos e histórico
- `rushx-payments` - Transações e carteira
- `rushx-tracking` - Histórico de rotas

**Redis:**
- Cache de sessões
- Fila de eventos
- Dados em tempo real

---

## 🚀 Deploy

**Desenvolvimento:** Docker Compose (tudo local)
**Produção:** Docker + Kubernetes (escalável)

Veja `docker-compose.yml` para detalhes.

---

## 📝 Próximos Passos

1. ✅ Estrutura base (este documento)
2. ⬜ Implementar User Service
3. ⬜ Implementar Order Service
4. ⬜ Implementar Payment Service
5. ⬜ Implementar Tracking Service
6. ⬜ Implementar API Gateway
7. ⬜ Integração Mobile
