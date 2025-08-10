// ...existing code...
export async function buscarNotificacoes(term: string, status?: 'todos' | 'ativos' | 'inativos') {
  // ...existing code...
  const params = new URLSearchParams();
  if (term) params.append('search', term);
  if (status && status !== 'todos') params.append('status', status);
  const response = await fetch(`/api/notifications?${params.toString()}`);
  if (!response.ok) throw new Error('Erro ao buscar notificações');
  return await response.json();
}
