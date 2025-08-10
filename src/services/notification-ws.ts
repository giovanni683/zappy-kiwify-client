// Serviço WebSocket para notificações em tempo real
let ws: WebSocket | null = null;
let reconnectTimeout: NodeJS.Timeout | null = null;

export function connectNotificationWebSocket(onMessage: (data: any) => void) {
  const url = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'; // ajuste para sua URL
  ws = new WebSocket(url);

  ws.onopen = () => {
    console.log('WebSocket conectado');
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (err) {
      console.error('Erro ao processar mensagem WebSocket:', err);
    }
  };

  ws.onclose = () => {
    console.warn('WebSocket desconectado, tentando reconectar...');
    reconnectTimeout = setTimeout(() => connectNotificationWebSocket(onMessage), 5000);
  };

  ws.onerror = (err) => {
    console.error('WebSocket erro:', err);
    ws?.close();
  };
}

export function disconnectNotificationWebSocket() {
  if (ws) {
    ws.close();
    ws = null;
  }
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }
}
