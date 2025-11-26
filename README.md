# 📅 Slotly - Sistema de Agendamentos

> Uma plataforma moderna, intuitiva e responsiva para gerenciar agendamentos de forma simples e eficiente.

## 🎯 Sobre o Projeto

Slotly é um protótipo funcional que simplifica o processo de agendamento para pequenos negócios e clientes. A plataforma permite:

✅ **Clientes** - Visualizar empresas, explorar serviços e agendar com poucos cliques  
✅ **Empresas** - Gerenciar serviços, visualizar agendamentos e organizar a agenda  
✅ **Dois Tipos de Usuário** - Autenticação baseada em localStorage com suporte a cliente e empresa  
✅ **Responsivo** - Interface perfeita em mobile, tablet e desktop  
✅ **Cores Suaves** - Paleta de cores moderna com slate, stone e zinc

---

## 🚀 Como Começar

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn

### Instalação

```bash
# 1. Clonar o repositório
cd slotly-prototype/frontend

# 2. Instalar dependências
npm install

# 3. Iniciar servidor de desenvolvimento
npm run dev

# 4. Abrir no navegador
# Acesse: http://localhost:5173
```

### Build para Produção

```bash
npm run build
npm run preview
```

---

## 📱 Funcionalidades

### 🏠 Home Page

- Dashboard com notificações diárias
- Cards com estatísticas (8+ empresas, 24/7 disponível)
- Seção "Por que escolher Slotly" com 4 benefícios principais
- Links rápidos para explorar e agendar

### 🏢 Empresas

- Listagem de 8 empresas diferentes
- Busca e filtro de empresas
- Serviços por empresa com preços e duração
- Botão de agendamento integrado com modal
- Design responsivo com gradientes variados

### 👤 Autenticação

- **Login** - Distingue entre cliente e empresa
- **Cadastro** - Formulário dinâmico (campos diferentes para cliente/empresa)
- **Persistência** - Dados salvos em localStorage com sessão mantida
- **Logout** - Limpeza segura de sessão

### 🎯 Sistema de Agendamentos

- Modal com seleção de data e horários
- Validação de autenticação (requer login)
- Impede agendamento de empresas
- Feedback visual de sucesso
- Armazenamento em localStorage

### 🏭 Painel da Empresa

- Acesso exclusivo para empresas logadas
- Adicionar novos serviços com nome, duração e preço
- Remover serviços com confirmação
- Estatísticas: serviços cadastrados, valor total
- Form com validação

### 📞 Contato

- Formulário com múltiplos assuntos (Feedback, Bug, Sugestão, Dúvida, Outro)
- Campos: Nome, Email, Telefone (opcional), Mensagem
- Modal de sucesso após envio
- Armazenamento de feedback em localStorage

### ℹ️ Sobre

- Missão e valores do Slotly
- Razões para usar a plataforma
- Informações sobre o protótipo funcional

### 📋 Agendamentos

- Visualização de agendamentos do usuário
- Histórico de reservas

---

## 🎨 Design & Responsividade

### Paleta de Cores (2024 Update)

- **Primária:** Slate (#475569 - slate-600 a slate-800)
- **Secundária:** Stone (#78716c - stone-600 a stone-700)
- **Terciária:** Zinc (#71717a - zinc-600 a zinc-700)
- **Destaques:** Amber/Orange para notificações
- **Status:** Red para erros, Green para sucesso

### Breakpoints

- **Mobile (padrão):** < 640px
- **Tablet (sm:):** 640px+
- **Desktop (lg:):** 1024px+

### Componentes Responsivos

```jsx
// Exemplo de padrão responsivo
className = "px-4 sm:px-6 lg:px-8 text-sm sm:text-base lg:text-lg";
className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6";
className = "flex flex-col sm:flex-row items-start sm:items-center";
```

---

## 🏗️ Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       (navegação sticky)
│   │   ├── Footer.jsx       (rodapé com links)
│   │   └── Header.jsx       (não usado - Navbar substitui)
│   ├── context/
│   │   └── AuthContext.jsx  (gerencia autenticação global)
│   ├── pages/
│   │   ├── Home.jsx         (dashboard)
│   │   ├── Empresas.jsx     (listagem com busca)
│   │   ├── Agendamentos.jsx (histórico)
│   │   ├── Sobre.jsx        (about)
│   │   ├── Contato.jsx      (formulário)
│   │   ├── Login.jsx        (autenticação)
│   │   ├── Register.jsx     (cadastro)
│   │   └── MinhaEmpresa.jsx (painel da empresa)
│   ├── data/
│   │   └── empresas.json    (8 empresas × 3 serviços)
│   ├── App.jsx              (router principal)
│   ├── main.jsx             (entry point)
│   └── index.css            (estilos globais)
├── package.json
├── vite.config.js
├── tailwind.config.cjs
├── postcss.config.cjs
└── index.html
```

---

## 🔐 Autenticação & Dados

### Usuários de Teste

```
CLIENTE:
- Email: cliente@test.com
- Senha: qualquer coisa

EMPRESA:
- Email: empresa@test.com
- Senha: qualquer coisa

OBS: O sistema simula login - qualquer email/senha funciona
```

### Armazenamento

- **localStorage** - Todos os dados persistem entre sessões
- **slotly_user** - Dados do usuário logado
- **slotly_notificacao** - Controle de notificação diária
- **slotly_feedback** - Mensagens de contato
- **slotly_empresas** - Serviços adicionados por empresas
- **slotly_agendamentos** - Reservas de clientes

---

## 🎯 Rotas Disponíveis

| Rota             | Componente   | Acesso                |
| ---------------- | ------------ | --------------------- |
| `/`              | Home         | Público               |
| `/empresas`      | Empresas     | Público               |
| `/agendamentos`  | Agendamentos | Autenticado (Cliente) |
| `/sobre`         | Sobre        | Público               |
| `/contato`       | Contato      | Público               |
| `/login`         | Login        | Público               |
| `/cadastro`      | Register     | Público               |
| `/minha-empresa` | MinhaEmpresa | Autenticado (Empresa) |

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 18** - Library para UI
- **React Router v6** - Roteamento
- **TailwindCSS 3.4** - Styling utility-first
- **Vite 5** - Build tool e dev server
- **date-fns** - Manipulação de datas

### Ferramentas

- **PostCSS** - CSS preprocessor
- **AutoPrefixer** - Browser compatibility

---

## 📊 Dados Inclusos

### 8 Empresas Pré-cadastradas

1. **Barbearia Exemplo** - Cortes, Barba, Sobrancelha
2. **Studio Beleza** - Manicure, Pedicure, Design de Sobrancelha
3. **Academia FitZone** - Personal Training, Musculação, Yoga
4. **Salão de Beleza Glamour** - Cabelo, Manicure, Penteado
5. **Clínica Odontológica Smile** - Limpeza, Clareamento, Restauração
6. **Studio de Yoga Zen** - Yoga, Meditação, Pilates
7. **Pet Shop Patas Felizes** - Banho, Tosa, Consulta
8. **Consultório Psicológico** - Primeira Consulta, Seguimento, Orientação

Cada empresa tem 3 serviços com preços e duração em minutos.

---

## ⚙️ Configurações Importantes

### Tailwind Config

```javascript
// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Vite Config

```javascript
// vite.config.js
export default {
  plugins: [react()],
  server: {
    port: 5173,
  },
};
```

---

## 🐛 Troubleshooting

### Problema: Notificações não aparecem

**Solução:** Limpar localStorage (`F12 > Application > Clear Storage`)

### Problema: Login não funciona

**Solução:** Verificar se localStorage está habilitado no navegador

### Problema: Serviços não aparecem após adicionar

**Solução:** Recarregar a página e verificar localStorage

### Problema: Estilos não carregam

**Solução:** `npm run dev` e certifique-se de que `npm install` foi executado

---

## 📈 Melhorias Futuras

- [ ] Backend com API REST
- [ ] Autenticação JWT
- [ ] Dashboard com gráficos
- [ ] Notificações em tempo real (WebSocket)
- [ ] Sistema de avaliações
- [ ] Dark mode
- [ ] Múltiplos idiomas (i18n)
- [ ] Integração com pagamento
- [ ] Confirmação de agendamento por email
- [ ] Relatórios e analytics

---

## 📄 Licença

MIT License - Sinta-se livre para usar este projeto!

---

## 💬 Feedback

Encontrou um bug? Tem sugestões? Use a página de contato dentro da plataforma para enviar feedback!

---

## 🎓 Aprendizado

Este projeto foi desenvolvido como protótipo funcional para demonstrar:

- ✅ Autenticação com Context API
- ✅ Roteamento com React Router
- ✅ Responsividade com TailwindCSS
- ✅ State management com hooks
- ✅ Persistência com localStorage
- ✅ Componentes reutilizáveis
- ✅ Design system consistente

---

**Versão:** 2.0  
**Última atualização:** 2024  
**Status:** Em desenvolvimento ativo 🚀
