import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { accountId } = req.query;
  const where: any = { type: 'ZAPPY' };
  if (accountId) where.accountId = String(accountId);
  res.status(200).json([]);
}
