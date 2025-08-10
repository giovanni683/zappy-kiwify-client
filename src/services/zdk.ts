// Listar eventos
export async function listarEventos() {
  if (typeof window !== 'undefined') throw new Error('Função só pode ser usada no backend');
  let zdk: any = null;
  const { Zdk } = require('zdk');
  zdk = new Zdk(
    process.env.NEXT_PUBLIC_ZAPPY_URL,
    process.env.NEXT_PUBLIC_ZAPPY_TOKEN
  );
  return await zdk.events.list();
}

// Exemplo de configuração e uso do ZDK

let zdk: any = null;
if (typeof window === 'undefined') {
  // Só executa no backend (Node.js)
  const { Zdk } = require('zdk');
  zdk = new Zdk(
    process.env.NEXT_PUBLIC_ZAPPY_URL,
    process.env.NEXT_PUBLIC_ZAPPY_TOKEN
  );
}


// Exemplo de uso: listar conexões
// (chame este método em um componente ou serviço)
export async function listarConexoes() {
  if (!zdk) throw new Error('ZDK não inicializado');
  return await zdk.connections.list();
}

// Exemplo de uso: listar filas (queues)
export async function listarFilas() {
  if (!zdk) throw new Error('ZDK não inicializado');
  return await zdk.queues.list();
}


// Atualizar ticket (finalizar, transferir setor, etc)
export async function atualizarTicket(ticketId: string, data: { queueId?: string, status?: string, userId?: string }) {
  if (!zdk) throw new Error('ZDK não inicializado');
  // O método update espera ticketId e um objeto de dados
  return await zdk.tickets.update(ticketId, data);
}
