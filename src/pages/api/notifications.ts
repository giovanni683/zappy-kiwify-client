
import type { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '@/lib/db';
const WebSocket = require('ws');
const globalAny = global as any;
let wss = globalAny.wss;
if (!wss && typeof globalAny.server !== 'undefined') {
  wss = new WebSocket.Server({ server: globalAny.server });
  globalAny.wss = wss;
}
function broadcastNotification(data: unknown) {
  if (!wss) return;
  (wss.clients as Set<any>).forEach((client: any) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });
}

async function getNotificationById(id: string) {
  const conn = await pool.getConnection();
  const rows = await conn.query('SELECT * FROM notifications WHERE id = ?', [id]);
  conn.release();
  return rows[0] || null;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const conn = await pool.getConnection();
  try {
    if (req.method === 'GET') {
      const { id, search, status } = req.query;
      if (id) {
        const rows = await conn.query('SELECT * FROM notifications WHERE id = ?', [id]);
        conn.release();
        if (!rows[0]) return res.status(404).json({ error: 'Notificação não encontrada' });
        return res.status(200).json(rows[0]);
      }
      let sql = 'SELECT * FROM notifications';
      const params: any[] = [];
      if (search) {
        sql += ' WHERE name LIKE ?';
        params.push(`%${search}%`);
      }
      const rows = await conn.query(sql, params);
      conn.release();
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { name, message, event, connection, sector, isActive } = req.body;
      const result = await conn.query(
        'INSERT INTO notifications (name, message, event, connection, sector, isActive) VALUES (?, ?, ?, ?, ?, ?)',
        [name, message, event, connection, sector, !!isActive]
      );
      const newId = result.insertId;
      const rows = await conn.query('SELECT * FROM notifications WHERE id = ?', [newId]);
      conn.release();
      broadcastNotification({ type: 'created', notification: rows[0] });
      return res.status(201).json(rows[0]);
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;
      const fields = Object.keys(updates).map(k => `${k} = ?`).join(', ');
      const values = Object.values(updates);
      await conn.query(`UPDATE notifications SET ${fields} WHERE id = ?`, [...values, id]);
      const rows = await conn.query('SELECT * FROM notifications WHERE id = ?', [id]);
      conn.release();
      if (!rows[0]) return res.status(404).json({ error: 'Notificação não encontrada' });
      broadcastNotification({ type: 'updated', notification: rows[0] });
      return res.status(200).json(rows[0]);
    }

    if (req.method === 'PATCH') {
      const { id, isActive } = req.body;
      await conn.query('UPDATE notifications SET isActive = ? WHERE id = ?', [!!isActive, id]);
      const rows = await conn.query('SELECT * FROM notifications WHERE id = ?', [id]);
      conn.release();
      if (!rows[0]) return res.status(404).json({ error: 'Notificação não encontrada' });
      broadcastNotification({ type: 'status', notification: rows[0] });
      return res.status(200).json(rows[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      await conn.query('DELETE FROM notifications WHERE id = ?', [id]);
      conn.release();
      broadcastNotification({ type: 'deleted', id });
      return res.status(204).end();
    }

    conn.release();
    return res.status(405).json({ error: 'Método não permitido' });
  } catch (err) {
    conn.release();
    return res.status(500).json({ error: 'Erro interno', details: String(err) });
  }
}
