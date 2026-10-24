# 📝 testador

Uma aplicação de **lista de tarefas** simples e intuitiva, desenvolvida com **Next.js** e **TypeScript**. O **testador** permite que você crie, conclua e exclua tarefas, mantendo suas atividades diárias organizadas de forma prática e eficiente.

## ✨ Funcionalidades

- Adicionar novas tarefas
- Marcar tarefas como concluídas
- Excluir tarefas existentes
- Interface componentizada e responsiva

## 🚀 Tecnologias

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/) e [Testing Library](https://testing-library.com/) (para testes)

## 📂 Estrutura do Projeto

```text
testador/
├── src/
│   ├── app/               # Páginas e layouts (Next.js App Router)
│   ├── components/        # Componentes da interface (Lista, Nova Tarefa, etc.)
│   ├── data/              # Dados iniciais/mockados
│   ├── hooks/             # Hooks customizados (ex: useContadorDeTarefas)
│   ├── tests/             # Testes unitários e de integração
│   └── types/             # Definições de tipos do TypeScript
├── public/                # Arquivos estáticos
├── jest.config.js         # Configuração do Jest
└── package.json           # Dependências e scripts do projeto

📦 Instalação
Clone o repositório e acesse a pasta do projeto:

bash
git clone https://github.com/seu-usuario/testador.git
cd testador
Em seguida, instale as dependências usando uma das opções abaixo:

bash
npm install

ou, para instalações determinísticas (recomendado em ambientes de CI/CD):

bash
npm ci

▶️ Executando o projeto
Inicie o servidor de desenvolvimento:

bash
npm run dev

A aplicação estará disponível em http://localhost:3000 (porta padrão do Next.js).

🧪 Testes
Execute a suíte de testes com o Jest:

bash
npm test
