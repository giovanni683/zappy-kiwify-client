import type { NextApiRequest, NextApiResponse } from 'next';
import { listZappySectors } from '@/services/zappy'; // Ajuste o caminho conforme sua estrutura

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { accountId } = req.query;
  try {
    const queues = await listZappySectors(accountId as string);
    res.status(200).json(queues);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
