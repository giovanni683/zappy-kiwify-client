import type { NextApiRequest, NextApiResponse } from 'next';

const events = [
  {
    key: 'boleto_gerado',
    label: 'Boleto Gerado',
    description: 'Quando um boleto é gerado.',
    example: {
      id: '12345',
      valor: 100.0,
      data_vencimento: '2023-10-10',
      url_boleto: 'http://exemplo.com/boleto/12345',
    },
  },
  {
    key: 'pix_gerado',
    label: 'Pix Gerado',
    description: 'Quando um pix é gerado.',
    example: {
      id: '67890',
      valor: 50.0,
      data_hora: '2023-10-10T10:00:00Z',
      chave_pix: 'exemplo@pix.com',
    },
  },
  {
    key: 'compra_aprovada',
    label: 'Compra Aprovada',
    description: 'Quando uma compra é aprovada.',
    example: {
      id: '111213',
      valor_total: 150.0,
      data_compra: '2023-10-09',
      itens: [
        { produto_id: 'abc123', quantidade: 1, preco_unitario: 100.0 },
        { produto_id: 'def456', quantidade: 2, preco_unitario: 25.0 },
      ],
    },
  },
  {
    key: 'compra_recusada',
    label: 'Compra Recusada',
    description: 'Quando uma compra é recusada.',
    example: {
      id: '141516',
      motivo: 'Cartão de crédito recusado',
      data_tentativa: '2023-10-09T09:00:00Z',
    },
  },
  {
    key: 'carrinho_abandonado',
    label: 'Carrinho Abandonado',
    description: 'Quando um carrinho é abandonado.',
    example: {
      id: '171819',
      itens: [
        { produto_id: 'abc123', quantidade: 1, preco_unitario: 100.0 },
        { produto_id: 'def456', quantidade: 2, preco_unitario: 25.0 },
      ],
      valor_total: 150.0,
      data_abandono: '2023-10-08T15:30:00Z',
    },
  },
  {
    key: 'subscription_late',
    label: 'Assinatura Atrasada',
    description: 'Quando uma assinatura está atrasada.',
    example: {
      id: '202122',
      plano: 'Mensal',
      valor: 30.0,
      data_vencimento: '2023-10-05',
      usuario_id: 'usu123',
    },
  },
  {
    key: 'subscription_canceled',
    label: 'Assinatura Cancelada',
    description: 'Quando uma assinatura é cancelada.',
    example: {
      id: '232425',
      plano: 'Anual',
      valor: 300.0,
      data_cancelamento: '2023-10-07',
      usuario_id: 'usu456',
    },
  },
  {
    key: 'compra_reembolsada',
    label: 'Compra Reembolsada',
    description: 'Quando uma compra é reembolsada.',
    example: {
      id: '262728',
      valor_reembolso: 150.0,
      data_reembolso: '2023-10-09',
      motivo: 'Produto com defeito',
    },
  },
  {
    key: 'chargeback',
    label: 'Chargeback',
    description: 'Quando ocorre um chargeback.',
    example: {
      id: '293031',
      valor: 100.0,
      data_chargeback: '2023-10-10',
      motivo: 'Transação não reconhecida',
    },
  },
  {
    key: 'subscription_renewed',
    label: 'Assinatura Renovada',
    description: 'Quando uma assinatura é renovada.',
    example: {
      id: '323334',
      plano: 'Semestral',
      valor: 180.0,
      data_renovacao: '2023-10-10',
      usuario_id: 'usu789',
    },
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  res.status(200).json({ events });
}
