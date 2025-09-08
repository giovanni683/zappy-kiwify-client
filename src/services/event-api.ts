// Função para consumir eventos via endpoint REST do backend
export async function listarEventosApi() {
  const res = await fetch('/api/zappy/events');
  if (!res.ok) throw new Error('Erro ao buscar eventos');
  const { events } = await res.json();
  return events;
}
