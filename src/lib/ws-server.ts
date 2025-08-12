import { Server } from 'socket.io';
let io: Server | null = null;

export function initSocketIOServer(server: any): Server {
  if (io) return io;
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });
  io.on('connection', (socket) => {
    // Você pode adicionar lógica de autenticação ou rooms aqui
  });
  return io;
}

export function broadcastNotification(data: unknown): void {
  if (io) {
    io.emit('notification', data);
  }
}
