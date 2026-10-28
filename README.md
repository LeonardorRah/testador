# Testador

Uma lista de tarefas feita com Next.js, React e TypeScript. A aplicação permite adicionar tarefas, marcá-las como concluídas, removê-las e filtrar a lista por status. As alterações são mantidas no armazenamento local do navegador.

## Requisitos

- Node.js 20.9 ou superior (Node.js 22 LTS é recomendado)
- npm

## Instalação

No terminal, acesse a pasta do projeto e instale as dependências:

```bash
npm install
```

Para instalar exatamente as versões registradas no `package-lock.json` (por exemplo, em CI), use:

```bash
npm ci
```

## Executar em desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Testes

Execute os testes automatizados:

```bash
npm test
```

As suítes verificam a renderização da página e das tarefas iniciais, a validação e submissão do formulário de nova tarefa e a contagem de tarefas totais, concluídas e pendentes, incluindo uma lista vazia.

## Build de produção

```bash
npm run build
```

## Estrutura do projeto

```text
src/
├── app/          # Página principal, layout e estilos globais
├── components/   # Componentes de interface, incluindo tarefas e formulário
├── data/         # Tarefas iniciais
├── hooks/        # Hook para calcular os totais por status
├── tests/        # Testes de componentes, página e hook
└── types/        # Tipos compartilhados da aplicação
public/           # Arquivos estáticos
```
