# 🛠️ Guia de Desenvolvimento

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- MongoDB local ou Docker
- Redis local ou Docker
- Git

---

## 🚀 Setup Inicial

### 1. Clonar Repositório
```bash
git clone https://github.com/henrycalazans3-ship-it/rushx.git
cd rushx
```

### 2. Setup com Docker (Recomendado)
```bash
docker-compose up -d
docker-compose ps
docker-compose logs -f api-gateway
```

### 3. Setup Manual

#### 3.1 Instalar Dependências
```bash
cd api-gateway && npm install && cd ..
cd services/user-service && npm install && cd ../..
cd services/order-service && npm install && cd ../..
cd services/payment-service && npm install && cd ../..
cd services/tracking-service && npm install && cd ../..
```

#### 3.2 Iniciar Bancos de Dados
```bash
docker run -d -p 27017:27017 --name rushx-mongo mongo:6.0
docker run -d -p 6379:6379 --name rushx-redis redis:7-alpine
```

#### 3.3 Iniciar Serviços
```bash
cd api-gateway && npm run dev
cd services/user-service && npm run dev
cd services/order-service && npm run dev
cd services/payment-service && npm run dev
cd services/tracking-service && npm run dev
```

---

## 🏗️ Estrutura de Pastas

```
rushx/
├── api-gateway/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── app.js
│   ├── package.json
│   └── Dockerfile
├── services/
│   ├── user-service/
│   ├── order-service/
│   ├── payment-service/
│   └── tracking-service/
├── mobile/
├── admin-dashboard/
├── docs/
├── docker-compose.yml
└── .gitignore
```

---

## 📦 Padrões de Código

### Exemplo de Controller

```javascript
const registerUser = async (req, res) => {
  try {
    const { phoneNumber, name, userType } = req.body;
    
    if (!phoneNumber || !name || !userType) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_REQUEST', message: 'Campos obrigatórios ausentes' }
      });
    }
    
    const user = await authService.register({ phoneNumber, name, userType });
    
    res.status(201).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message }
    });
  }
};

module.exports = { registerUser };
```

### Exemplo de Rota

```javascript
const express = require('express');
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const { validateRegister } = require('../middleware/validation');

const router = express.Router();

router.post('/register', validateRegister, authController.registerUser);
router.post('/login', authController.login);
router.post('/verify-sms', authController.verifySMS);
router.get('/profile', verifyToken, authController.getProfile);

module.exports = router;
```

---

## 🔄 Git Workflow

### Branches
- `main` - Produção (estável)
- `develop` - Desenvolvimento (pode estar em testes)
- `feature/nome-da-feature` - Novas features
- `fix/nome-do-bug` - Correções de bugs

### Fluxo

```bash
git checkout -b feature/auth-sms
git add .
git commit -m "feat: implementar autenticação por SMS"
git push origin feature/auth-sms
```

### Mensagens de Commit

```
<tipo>(<escopo>): <assunto>

<descrição detalhada se necessário>

<footer>
```

**Tipos:**
- `feat:` - Nova feature
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação de código
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Configuração, dependências

---

## 🧪 Testes

```bash
cd services/user-service
npm test
```

### Exemplo de Teste

```javascript
const request = require('supertest');
const app = require('../../app');

describe('Auth Controller', () => {
  describe('POST /auth/register', () => {
    it('deve registrar um novo usuário', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          phoneNumber: '+244923123456',
          name: 'João Silva',
          userType: 'client'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.user).toHaveProperty('_id');
    });
  });
});
```

---

## 🐛 Debugging

### Logs
```bash
docker-compose logs user-service
docker-compose logs -f tracking-service
```

### VS Code Launch Configuration

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch User Service",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/services/user-service/src/server.js"
    }
  ]
}
```

---

## 📚 Recursos Úteis

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Socket.IO Docs](https://socket.io/docs/)
- [JWT Tutorial](https://jwt.io/introduction)

---

## 🆘 Troubleshooting

### MongoDB Connection Error
```bash
mongosh
docker-compose ps mongo
```

### Port Already in Use
```bash
lsof -i :3000
kill -9 <PID>
```

### Dependencies Issue
```bash
rm -rf node_modules package-lock.json
npm install
```
