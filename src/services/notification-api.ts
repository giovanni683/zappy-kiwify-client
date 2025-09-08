export type NotificationStatus = 'todos' | 'ativos' | 'inativos';

export async function buscarNotificacoes(
  term: string,
  status?: NotificationStatus,
  accountId?: string
): Promise<any> {
  const params = new URLSearchParams();
  if (term) params.append('search', term);
  if (status && status !== 'todos') params.append('status', status);
  if (accountId) params.append('accountId', accountId);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  try {
    const res = await fetch(`${baseUrl}/api/zappy/notification-rules?${params}`);
    if (!res.ok) throw new Error('Erro ao buscar notificações');
    return await res.json();
  } catch (error) {
    throw new Error('Erro ao buscar notificações: ' + (error instanceof Error ? error.message : String(error)));
  }
}
