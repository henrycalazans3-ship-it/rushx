# 🏍️ RushX - Fast Motorcycle Delivery App

## Visão Geral
RushX é um aplicativo de entregas rápidas por moto em Benguela. Conecta clientes que precisam enviar documentos/encomendas com motoqueiros que querem ganhar dinheiro.

**Recursos Principais:**
- ⚡ Entregas em minutos
- 🛡️ Segurança com SOS e compartilhamento de rota
- 💰 Pagamento express e em dinheiro
- 📍 Rastreamento em tempo real com WebSocket
- ⭐ Sistema de avaliações
- 📊 Painel administrativo

---

## 🏗️ Arquitetura

```
rushx/
├── api-gateway/                 # Porta 3000 - Orquestrador
├── services/
│   ├── user-service/           # Porta 3001 - Autenticação e perfis
│   ├── order-service/          # Porta 3002 - Pedidos de entrega
│   ├── payment-service/        # Porta 3003 - Pagamentos
│   └── tracking-service/       # Porta 3004 - Rastreamento real-time
├── mobile/                      # React Native / Flutter
├── admin-dashboard/             # React - Painel admin
├── docker-compose.yml
└── docs/
```

---

## 🛠️ Stack Tecnológico

**Backend:**
- Node.js + Express.js
- WebSocket (socket.io)
- MongoDB
- JWT para autenticação
- Docker & Docker Compose

**Mobile:**
- React Native / Flutter (estrutura pronta)

**Admin:**
- React.js

**Real-time:**
- Socket.IO para rastreamento de motos

---

## 🚀 Quick Start

### 1. Clonar repositório
```bash
git clone https://github.com/henrycalazans3-ship-it/rushx.git
cd rushx
```

### 2. Setup com Docker (recomendado)
```bash
docker-compose up -d
```

### 3. Setup Manual (Node.js 18+)

```bash
# API Gateway
cd api-gateway
npm install
npm run dev

# Em outro terminal - User Service
cd ../services/user-service
npm install
npm run dev

# Em outro terminal - Order Service
cd ../services/order-service
npm install
npm run dev

# Em outro terminal - Payment Service
cd ../services/payment-service
npm install
npm run dev

# Em outro terminal - Tracking Service
cd ../services/tracking-service
npm install
npm run dev
```

---

## 📝 Endpoints Disponíveis

### Auth (User Service)
- `POST /auth/register` - Criar conta
- `POST /auth/login` - Login com número
- `POST /auth/verify-sms` - Verificar SMS
- `GET /auth/profile` - Perfil do usuário

### Pedidos (Order Service)
- `POST /orders` - Criar pedido
- `GET /orders/:id` - Detalhes do pedido
- `PUT /orders/:id/accept` - Aceitar entrega
- `GET /orders` - Listar pedidos

### Pagamentos (Payment Service)
- `POST /payments` - Criar pagamento
- `GET /payments/:id` - Status do pagamento
- `POST /payments/withdraw` - Levantar dinheiro

### Rastreamento (Tracking Service)
- WebSocket: `ws://localhost:3004`
- Emits real-time: `biker-location`, `order-status`

---

## 🔐 Variáveis de Ambiente

Crie `.env` em cada serviço:

```env
# Comum
NODE_ENV=development
LOG_LEVEL=debug

# User Service
USER_SERVICE_PORT=3001
MONGODB_URL=mongodb://mongo:27017/rushx-users
JWT_SECRET=your-secret-key-here

# Order Service
ORDER_SERVICE_PORT=3002
MONGODB_URL=mongodb://mongo:27017/rushx-orders
API_GATEWAY_URL=http://api-gateway:3000

# Payment Service
PAYMENT_SERVICE_PORT=3003
STRIPE_SECRET_KEY=your-stripe-key

# Tracking Service
TRACKING_SERVICE_PORT=3004
REDIS_URL=redis://redis:6379
```

---

## 📊 Roadmap MVP

### Fase 1 (Semana 1-2): Auth + Pedido Básico ⭐ PRÓXIMA
- [x] Setup inicial
- [ ] Autenticação por SMS
- [ ] Criar pedido
- [ ] Aceitar/Recusar entrega
- [ ] Mapa básico

### Fase 2 (Semana 3-4): Pagamento + Chat
- [ ] Pagamento express
- [ ] Pagamento em dinheiro
- [ ] Chat em tempo real
- [ ] Avaliações

### Fase 3 (Semana 5+): Admin + Avançado
- [ ] Painel administrativo
- [ ] Analytics
- [ ] Promoções
- [ ] Ranking de motoqueiros

---

## 🔗 Links Úteis

- [Documentação API Completa](./docs/API.md)
- [Guia de Desenvolvimento](./docs/DEVELOPMENT.md)
- [Arquitetura Detalhada](./docs/ARCHITECTURE.md)

---

## 👨‍💻 Autor

**Henry Calazans** - [GitHub](https://github.com/henrycalazans3-ship-it)

---

## 📄 Licença

MIT
