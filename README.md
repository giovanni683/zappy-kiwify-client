# zappy-kiwify-app

## Visão Geral
Aplicação React/Next.js para gerenciamento e envio de notificações em tempo real, integrada ao backend ZDK. Possui testes automatizados, ambiente Docker para produção e arquitetura modular.

## Estrutura do Projeto
- `src/components/notifications/`: Componentes de notificação (criar, editar, listar, detalhes)
- `src/components/ui/`: Componentes de interface reutilizáveis
- `src/services/`: Integração com APIs e WebSocket
- `src/__tests__/`: Testes unitários com Jest e React Testing Library
- `Dockerfile`: Configuração para build e deploy em produção

## Testes
- Todos os componentes principais possuem testes automatizados.
- Para rodar os testes: `npx jest`
- Testes garantem que funcionalidades críticas não quebrem com alterações futuras.

## Como rodar localmente
1. Instale dependências: `npm install`
2. Execute: `npm run dev`
3. Acesse em `http://localhost:3000`

## Como rodar os testes
`npx jest`

## Como gerar build de produção
`npm run build`

## Docker
- Build: `docker build -t zappy-kiwify-app .`
- Run: `docker run -p 3000:3000 zappy-kiwify-app`

## Deploy
- O deploy pode ser feito em qualquer ambiente que suporte Docker (AWS, Azure, GCP, VPS, etc).
- Recomenda-se configurar variáveis de ambiente e volumes conforme necessidade.

## API
- A integração é feita via serviços em `src/services/`.
- Exemplos de uso e mocks estão nos testes em `src/__tests__/`.


