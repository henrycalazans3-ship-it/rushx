# Guia de Contribuição - RUSHX

## Como Contribuir

### 1. Fork o Repositório
```bash
git clone https://github.com/seu-usuario/rushx.git
cd rushx
```

### 2. Crie uma Branch para Sua Feature
```bash
git checkout -b feature/sua-feature
```

### 3. Siga as Convenções de Código
- Use ESLint para JavaScript/TypeScript
- Indentação com 2 espaços
- Nomes de variáveis em camelCase
- Nomes de componentes em PascalCase
- Comentários em português

### 4. Commit com Mensagens Descritivas
```bash
git commit -m "feat: adicionar validação de SMS"
```

#### Prefixos de Commit
- `feat:` Nova feature
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração de código
- `test:` Adição de testes
- `chore:` Tarefas de manutenção

### 5. Faça Push e Abra um Pull Request
```bash
git push origin feature/sua-feature
```

Depois, abra um Pull Request no GitHub.

## Padrões de Código

### JavaScript/TypeScript
```javascript
// ✓ Bom
const getUserById = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

// ✗ Evitar
function get_user(id) {
  return User.findById(id);
}
```

### React Components
```javascript
// ✓ Bom
const DeliveryCard = ({ delivery, onPress }) => {
  return (
    <View>
      <Text>{delivery.address}</Text>
    </View>
  );
};

export default DeliveryCard;
```

## Testes

Antes de fazer um commit, certifique-se de que os testes passam:

```bash
npm test
```

Adicione testes para novas features:

```bash
# Estrutura de testes
__tests__/
  unit/
  integration/
  e2e/
```

## Processo de Review

1. Um membro da equipe revisará seu PR
2. Pedidos de mudanças podem ser solicitados
3. Após aprovação, seu PR será merged
4. Sua contribuição aparecerá na próxima release

## Reportar Bugs

Ao reportar bugs, inclua:
- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado
- Comportamento atual
- Screenshots/videos (se aplicável)
- Sistema operacional e versão

## Sugerir Features

Sugestões são bem-vindas! Abra uma issue com:
- Título claro e descritivo
- Descrição detalhada da feature
- Casos de uso
- Mockups/wireframes (se aplicável)

## Código de Conduta

Por favor, seja respeitoso com todos os contribuidores. Discriminação, assédio ou comportamento tóxico não será tolerado.
