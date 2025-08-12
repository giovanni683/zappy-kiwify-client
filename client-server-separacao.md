# Separação de Client e Server em Repositórios Diferentes

## 1. Comunicação
- O client deve acessar o backend via URL pública (ex: http://localhost:3001 ou produção).
- No client, altere as URLs das chamadas API e socket.io para apontar para o novo endereço do backend.

## 2. Variáveis de ambiente
- Configure no client (ex: .env.local) a URL do backend (ex: NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SOCKET_URL).
- No server, mantenha as configurações de banco e portas.

## 3. Docker/Deploy
- Cada repositório terá seu próprio Dockerfile e pipeline.
- O client pode ser servido separadamente (Vercel, Netlify, etc.) e o server em outro serviço (Heroku, AWS, etc.).

## 4. CORS
- No backend, habilite CORS para permitir requisições do domínio do client.

## 5. Documentação
- Atualize o README de ambos os projetos para explicar como rodar e conectar os dois.

---

Se quiser exemplos de configuração, só pedir!
