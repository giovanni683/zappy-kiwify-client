import type { Server as WebSocketServerType, WebSocket as WebSocketType } from 'ws';
const WebSocket = require('ws');
const WebSocketServer: typeof WebSocketServerType = WebSocket.Server;

let wss: WebSocketServerType | null = null;
let clients: Set<WebSocketType> = new Set();

export function initWebSocketServer(server: any): WebSocketServerType {
  if (wss) return wss;
  wss = new WebSocketServer({ server });
  wss.on('connection', (ws: WebSocketType) => {
    clients.add(ws);
    ws.on('close', () => clients.delete(ws));
  });
  return wss;
}

export function broadcastNotification(data: unknown): void {
  for (const client of Array.from(clients)) {
    if ((client as WebSocketType).readyState === WebSocket.OPEN) {
      (client as WebSocketType).send(JSON.stringify(data));
    }
  }
}
