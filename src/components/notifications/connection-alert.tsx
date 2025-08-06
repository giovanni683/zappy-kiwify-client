
interface ConnectionAlertProps {
  type: 'warning' | 'no-connection';
}

export function ConnectionAlert({ type }: ConnectionAlertProps) {
  // Padronização visual conforme NewNotification
  const baseStyle = {
    width: 388,
    margin: '0 auto',
    background: 'rgba(255, 194, 25, 0.2)',
    borderRadius: 20,
    padding: 10,
    minHeight: 90,
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 24,
  };
  return (
    <div style={baseStyle}>
      <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#FFC219' }}>
        {type === 'warning' ? '⚠️' : '⚡'}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, flexGrow: 1 }}>
        <span style={{ fontWeight: 600, fontSize: 16, lineHeight: '19px', color: '#000', height: 19 }}>
          {type === 'warning' ? 'Importante' : 'Sem conexão Zappy!'}
        </span>
        <span style={{ fontWeight: 500, fontSize: 14, lineHeight: '17px', color: 'rgba(0,0,0,0.7)', display: 'block' }}>
          {type === 'warning'
            ? 'Para que a notificação funcione corretamente, é essencial que o cliente tenha um número de telefone com DDI + DDD cadastrado (ex: +55 11 99999-9999) e que você possua o número ativo e conectado na sua conta Zappy.'
            : 'Conecte um número na Zappy para poder selecionar uma conexão e enviar notificações.'}
        </span>
      </div>
    </div>
  );
}