# Especificação da API REST - RUSHX

## Base URL
```
https://api.rushx.com/v1
```

## Autenticação
Todas as requisições devem incluir:
```
Authorization: Bearer {token}
```

---

## Endpoints - Autenticação

### POST /auth/register/client
Registro de novo cliente

**Request:**
```json
{
  "fullName": "João Silva",
  "phoneNumber": "+244924123456",
  "password": "senha_segura_123",
  "acceptTerms": true
}
```

**Response (201):**
```json
{
  "id": "client_123",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "message": "Código SMS enviado"
}
```

### POST /auth/register/driver
Registro de novo motoqueiro

**Request:**
```json
{
  "fullName": "Manuel Costa",
  "phoneNumber": "+244925654321",
  "idNumber": "123456789",
  "licenseNumber": "DL-2024-001",
  "bikeDocument": "bike_doc_url",
  "profilePhoto": "photo_url",
  "selfiePhoto": "selfie_url",
  "password": "senha_segura_123"
}
```

**Response (201):**
```json
{
  "id": "driver_123",
  "message": "Registro enviado para aprovação do administrador"
}
```

### POST /auth/login
Login

**Request:**
```json
{
  "phoneNumber": "+244924123456",
  "password": "senha_segura_123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "userType": "client",
  "userId": "client_123"
}
```

### POST /auth/verify-otp
Verificar código SMS

**Request:**
```json
{
  "phoneNumber": "+244924123456",
  "code": "123456"
}
```

**Response (200):**
```json
{
  "verified": true
}
```

### POST /auth/forgot-password
Recuperação de palavra-passe

**Request:**
```json
{
  "phoneNumber": "+244924123456"
}
```

**Response (200):**
```json
{
  "message": "Código SMS de recuperação enviado"
}
```

---

## Endpoints - Entregas

### POST /deliveries
Criar nova entrega

**Request:**
```json
{
  "pickup": {
    "address": "Rua A, 123",
    "coordinates": { "lat": -8.8383, "lng": 13.2344 },
    "senderName": "João",
    "senderPhone": "+244924123456"
  },
  "destination": {
    "address": "Rua B, 456",
    "coordinates": { "lat": -8.8400, "lng": 13.2350 },
    "recipientName": "Maria",
    "recipientPhone": "+244925654321"
  },
  "package": {
    "type": "documents",
    "description": "Documentos importantes",
    "weight": "0.5kg",
    "declaredValue": 100
  },
  "deliveryType": "normal",
  "paymentMethod": "multicaixa"
}
```

**Response (201):**
```json
{
  "id": "delivery_123",
  "status": "pending",
  "distance": "2.5km",
  "price": "250.00 AOA",
  "estimatedTime": "15 minutos",
  "pin": "1234"
}
```

### GET /deliveries/:id
Obter detalhes da entrega

**Response (200):**
```json
{
  "id": "delivery_123",
  "status": "in_transit",
  "driver": {
    "id": "driver_123",
    "name": "Manuel Costa",
    "rating": 4.8,
    "bikeModel": "Honda CB500",
    "licensePlate": "AA-12-CD",
    "eta": "5 minutos",
    "distance": "0.8km",
    "coordinates": { "lat": -8.8390, "lng": 13.2345 }
  },
  "pickup": {},
  "destination": {},
  "package": {}
}
```

### GET /deliveries
Listar entregas do utilizador

**Query Parameters:**
- `status`: pending, accepted, in_transit, delivered, cancelled
- `limit`: 10 (padrão)
- `offset`: 0 (padrão)

**Response (200):**
```json
{
  "total": 25,
  "deliveries": []
}
```

### PUT /deliveries/:id/status
Atualizar status da entrega

**Request:**
```json
{
  "status": "in_transit"
}
```

**Response (200):**
```json
{
  "id": "delivery_123",
  "status": "in_transit"
}
```

### POST /deliveries/:id/complete
Concluir entrega com PIN

**Request:**
```json
{
  "pin": "1234"
}
```

**Response (200):**
```json
{
  "id": "delivery_123",
  "status": "delivered",
  "completedAt": "2024-01-15T14:30:00Z"
}
```

---

## Endpoints - Avaliações

### POST /ratings
Criar avaliação

**Request:**
```json
{
  "deliveryId": "delivery_123",
  "rating": 5,
  "comment": "Entrega rápida e segura!",
  "categories": {
    "service": 5,
    "speed": 4,
    "politeness": 5,
    "packageCondition": 5
  }
}
```

**Response (201):**
```json
{
  "id": "rating_123",
  "createdAt": "2024-01-15T14:35:00Z"
}
```

---

## Endpoints - Carteira (Motoqueiro)

### GET /wallet
Obter saldo da carteira

**Response (200):**
```json
{
  "balance": 5000.00,
  "earnedToday": 500.00,
  "earnedThisWeek": 2500.00,
  "earnedThisMonth": 8000.00,
  "totalDeliveries": 150,
  "averageRating": 4.7
}
```

### POST /wallet/withdraw
Solicitar levantamento

**Request:**
```json
{
  "amount": 1000.00,
  "method": "multicaixa"
}
```

**Response (201):**
```json
{
  "id": "withdrawal_123",
  "status": "pending",
  "createdAt": "2024-01-15T14:40:00Z"
}
```

---

## Códigos de Erro

| Código | Descrição |
|--------|----------|
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Token inválido |
| 403 | Forbidden - Sem permissão |
| 404 | Not Found - Recurso não encontrado |
| 409 | Conflict - Recurso já existe |
| 500 | Server Error - Erro interno |
| 503 | Service Unavailable - Serviço indisponível |
