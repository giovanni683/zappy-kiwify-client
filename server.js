const { createServer } = require('http');
const next = require('next');
const { Server } = require('ws');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  // WebSocket server
  const wss = new Server({ server });

  // Função para broadcast de notificações
  function broadcastNotification(data) {
    wss.clients.forEach(client => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(data));
      }
    });
  }

  // Exemplo: escutar eventos do banco (mock)
  // Você pode importar e usar o broadcastNotification nas rotas da API
  // Aqui, apenas para teste, envia uma mensagem a cada nova conexão
  wss.on('connection', ws => {
    ws.send(JSON.stringify({ type: 'info', message: 'Conectado ao WebSocket!' }));
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
    console.log('> WebSocket running on ws://localhost:3000');
  });
});
