import type { NextApiRequest, NextApiResponse } from 'next';
import { listZappyConnections } from '@/services/zappy'; // Ajuste o caminho conforme sua estrutura

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { accountId } = req.query;
  try {
    const connections = await listZappyConnections(accountId as string);
    res.status(200).json(connections);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
