import { Notification, Connection, Event, Sector, Variable } from '@/types/notification';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    name: 'Compra aprovada',
    event: 'purchase_approved',
    connection: 'principal',
    sector: 'vendas',
    message: 'Olá {{cliente_primeiro_nome}}, sua compra foi aprovada! Agradecemos a preferência.',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Recuperação de boleto 24h',
    event: 'boleto_recovery',
    connection: 'principal',
    sector: 'vendas',
    message: 'Olá {{cliente_primeiro_nome}}, seu boleto vence em breve. Acesse: {{url_boleto}}',
    isActive: true,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
  },
  {
    id: '3',
    name: 'Carrinho abandonado-ofera',
    event: 'cart_abandoned',
    connection: 'principal',
    sector: 'vendas',
    message: 'Que pena que você não finalizou sua compra! Temos uma oferta especial para você.',
    isActive: false,
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
  },
  {
    id: '4',
    name: 'Assinatura atrasada',
    event: 'subscription_overdue',
    connection: 'principal',
    sector: 'vendas',
    message: 'Sua assinatura está em atraso. Regularize para continuar aproveitando nossos serviços.',
    isActive: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
];

export const mockConnections: Connection[] = [
  {
    id: 'principal',
    name: 'Conexão principal (zappy)',
    isDefault: true,
    isConnected: true,
  },
  {
    id: 'secundaria',
    name: 'Conexão secundária',
    isDefault: false,
    isConnected: false,
  },
];

export const mockEvents: Event[] = [
  { id: 'purchase_approved', name: 'Compra aprovada', description: 'Quando uma compra é aprovada' },
  { id: 'boleto_recovery', name: 'Recuperação de boleto 24h', description: 'Boleto próximo do vencimento' },
  { id: 'cart_abandoned', name: 'Carrinho abandonado', description: 'Cliente abandonou o carrinho' },
  { id: 'subscription_overdue', name: 'Assinatura atrasada', description: 'Assinatura com pagamento em atraso' },
  { id: 'refund_requested', name: 'Reembolso solicitado', description: 'Cliente solicitou reembolso' },
];

export const mockSectors: Sector[] = [
  { id: 'vendas', name: 'Vendas' },
  { id: 'suporte', name: 'Suporte' },
  { id: 'financeiro', name: 'Financeiro' },
  { id: 'nao_transferir', name: 'Não transferir' },
];

export const mockVariables: Variable[] = [
  { id: 'nome_completo', name: 'Nome completo', token: '{{cliente_nome_completo}}', description: 'Nome completo do cliente' },
  { id: 'primeiro_nome', name: 'Primeiro nome', token: '{{cliente_primeiro_nome}}', description: 'Primeiro nome do cliente' },
  { id: 'url_boleto', name: 'Url boleto', token: '{{url_boleto}}', description: 'Link para o boleto' },
  { id: 'expiracao_pix', name: 'Expiração PIX', token: '{{expiracao_pix}}', description: 'Data de expiração do PIX' },
  { id: 'codigo_pix', name: 'Código PIX', token: '{{codigo_pix}}', description: 'Código PIX para pagamento' },
  { id: 'valor_compra', name: 'Valor da compra', token: '{{valor_compra}}', description: 'Valor total da compra' },
  { id: 'codigo_barras', name: 'Cód. barras boleto', token: '{{codigo_barras_boleto}}', description: 'Código de barras do boleto' },
];