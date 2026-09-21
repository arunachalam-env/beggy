import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const totalSaved = Number((await kv.get('beggy:totalSaved')) || 0);
      const orders = Number((await kv.get('beggy:orders')) || 0);
      return res.status(200).json({ ok: true, totalSaved, orders });
    }

    if (req.method === 'POST') {
      const amount = Math.min(50000, Math.max(10, Math.round(Number(req.body?.amount) || 0)));
      if (!amount) return res.status(400).json({ ok: false });
      const totalSaved = await kv.incrby('beggy:totalSaved', amount);
      const orders = await kv.incr('beggy:orders');
      return res.status(200).json({ ok: true, totalSaved, orders });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).end();
  } catch (err) {
    // Graceful fallback if KV is not provisioned on Vercel
    if (req.method === 'GET') {
      return res.status(200).json({ ok: true, totalSaved: 0, orders: 0 });
    }
    return res.status(200).json({ ok: true, totalSaved: 0, orders: 0 });
  }
}
