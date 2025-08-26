FROM node:18-alpine AS builder

# 1. Variáveis de ambiente
ENV NODE_ENV=production
ENV NEXT_PUBLIC_ZAPPY_URL=https://sua-url
ENV NEXT_PUBLIC_ZAPPY_TOKEN=seu-token
ENV NEXT_PUBLIC_WS_URL=wss://sua-ws-url
ENV NEXT_PUBLIC_API_BASE_URL=https://sua-api-url

WORKDIR /app

# 2. Instalação otimizada de dependências
COPY package*.json ./
RUN npm ci --omit=dev

# 3. Copiar apenas arquivos necessários
COPY . .
# Remover arquivos de teste, configs e docs desnecessários, mas manter public/
RUN rm -rf cypress* *.md *.spec.* *.test.* babel.config.js babel.config.bak

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app ./
EXPOSE 3000

# 4. Healthcheck para garantir que o app está rodando
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
	CMD wget --spider --quiet http://localhost:3000 || exit 1

CMD ["npm", "start"]
