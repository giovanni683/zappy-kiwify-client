// Serviço Socket.IO para notificações em tempo real
import io from 'socket.io-client';
let socket: ReturnType<typeof io> | null = null;

export function connectNotificationWebSocket(onMessage: (data: any) => void) {
  const url = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001'; // ajuste para sua URL
  socket = io(url);

  socket.on('connect', () => {
    console.log('Socket.IO conectado');
  });

  socket.on('notification', (data: any) => {
    onMessage(data);
  });

  socket.on('disconnect', () => {
    console.warn('Socket.IO desconectado, tentando reconectar...');
    setTimeout(() => connectNotificationWebSocket(onMessage), 5000);
  });

  socket.on('error', (err: any) => {
    console.error('Socket.IO erro:', err);
    socket?.disconnect();
  });
}

export function disconnectNotificationWebSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
