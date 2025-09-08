import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';
  if (req.method === 'POST') {
    try {
      const response = await fetch(`${BACKEND_API_URL}/api/zappy/notification-rules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      if (!response.ok) {
        return res.status(response.status).json(data);
      }
      return res.status(201).json(data);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  } else if (req.method === 'PUT') {
    // Update notification template by ID
    const { id, ...updateData } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Missing notification template id' });
    }
    try {
      const response = await fetch(`${BACKEND_API_URL}/api/zappy/notification-rules/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      const data = await response.json();
      if (!response.ok) {
        return res.status(response.status).json(data);
      }
      return res.status(200).json(data);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', ['POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
