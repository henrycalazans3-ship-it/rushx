# RUSHX - Plataforma de Entrega Rápida

## Descrição do Projeto

RUSHX é uma plataforma inovadora de entrega rápida que conecta clientes, motoqueiros e comerciantes. A aplicação oferece entregas urgentes, programadas e sob encomenda com rastreamento em tempo real.

## Tecnologias Utilizadas

- **Frontend**: React Native / Flutter
- **Backend**: Node.js + Express
- **Banco de Dados**: MongoDB / PostgreSQL
- **Autenticação**: JWT + SMS OTP
- **Mapas**: Google Maps API
- **Pagamentos**: Multicaixa Express
- **Deployment**: Docker + AWS/Azure

## Estrutura do Projeto

```
rushx/
├── docs/                    # Documentação
├── backend/                 # API Backend
├── frontend-mobile/         # Aplicação Mobile
├── admin-dashboard/         # Painel Administrativo
├── .github/                 # GitHub Actions/Workflows
└── README.md
```

## Funcionalidades Principais

### 1. Autenticação
- Cadastro de Cliente
- Cadastro de Motoqueiro
- Login com SMS OTP
- Recuperação de Palavra-passe

### 2. Cliente
- Página inicial com mapa em tempo real
- Nova entrega (recolha + destino)
- Cálculo automático de preço
- Pagamentos (Multicaixa, Dinheiro)
- Rastreamento em tempo real
- Histórico de entregas
- Avaliações

### 3. Motoqueiro
- App móvel dedicada
- Ficar Online/Offline
- Aceitar/Recusar pedidos
- Carteira e ganhos
- Levantamento de fundos
- Avaliações e histórico

### 4. Administrador
- Painel de controle
- Aprovação de motoqueiros
- Gestão de preços
- Criar promoções
- Relatórios e estatísticas
- Gestão de zonas de cobertura

### 5. Segurança
- Verificação SMS
- PIN na entrega
- Encriptação de dados
- Detecção de fraude

## Como Iniciar

### Pré-requisitos
- Node.js v16+
- npm ou yarn
- Docker (opcional)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/henrycalazans3-ship-it/rushx.git
cd rushx

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie o servidor de desenvolvimento
npm run dev
```

## Roadmap

- [ ] V1.0 - MVP com funcionalidades core
- [ ] V1.1 - Funcionalidades Premium
- [ ] V2.0 - Integração com APIs externas
- [ ] V2.1 - Analytics avançado

## Issues & Tarefas

Acompanhe o desenvolvimento através das [Issues](https://github.com/henrycalazans3-ship-it/rushx/issues) do projeto. Temos 24 issues planejadas cobrindo:

- 🔐 Autenticação (6 issues)
- 📱 Frontend & UX (3 issues)
- 📦 Entregas (3 issues)
- 🏍️ Motoqueiros (2 issues)
- 💳 Pagamentos & Carteira (2 issues)
- ⭐ Avaliações (1 issue)
- 🔧 Admin (3 issues)
- 🔔 Notificações & Chat (2 issues)
- 🔒 Segurança & BD (3 issues)
- 🚀 DevOps (1 issue)

## Contribuição

Veja [CONTRIBUTING.md](./docs/CONTRIBUTING.md) para detalhes sobre como contribuir.

## Licença

MIT License - veja [LICENSE](./LICENSE) para mais detalhes.

## Contato

Para questões sobre o projeto, abra uma issue no GitHub.
