const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

// Funções para consumir endpoints REST do backend

export async function listZappyConnections(accountId?: string) {
  const params = accountId ? `?accountId=${accountId}` : '';
  const url = `${BACKEND_API_URL}/api/zappy/connections/active${params}`;
  const res = await fetch(url);
  console.log('[listZappyConnections] URL:', url, 'Status:', res.status);
  let body;
  try {
    body = await res.clone().json();
  } catch (e) {
    body = await res.clone().text();
  }
  console.log('[listZappyConnections] Body:', body);
  if (!res.ok) throw new Error('Erro ao buscar conexões');
  return body;
}

export async function listZappySectors(accountId?: string) {
  const params = accountId ? `?accountId=${accountId}` : '';
  const url = `${BACKEND_API_URL}/api/zappy/queues${params}`;
  const res = await fetch(url);
  console.log('[listZappySectors] URL:', url, 'Status:', res.status);
  let body;
  try {
    body = await res.clone().json();
  } catch (e) {
    body = await res.clone().text();
  }
  console.log('[listZappySectors] Body:', body);
  if (!res.ok) throw new Error('Erro ao buscar setores');
  return body;
}
