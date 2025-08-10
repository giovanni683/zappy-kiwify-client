// ...existing code...
export async function registrarAuditoria({ usuario, ticketId, acao, motivo }: {
  usuario: string;
  ticketId: string;
  acao: string;
  motivo?: string;
}) {
  console.log('[AUDITORIA]', {
    usuario,
    ticketId,
    acao,
    motivo,
    data: new Date().toISOString(),
  });
}
