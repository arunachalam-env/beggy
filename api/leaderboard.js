import { getKv, weekKey, clientIp } from './_kv.js';

// Weekly "biggest ghosters" boards: all-India + per city.
// GET  /api/leaderboard?city=bengaluru  -> { ok, kv, week, india:[{name,amount}], city:[...] }
// POST /api/leaderboard { name, city, amount, device } -> adds one completed simulation
const CITIES = ['bengaluru', 'mumbai', 'delhi', 'hyderabad'];
const MAX_PER_ORDER = 5000;      // a single fake bill can't be bigger than this
const MAX_POSTS_PER_HOUR = 12;   // per device + IP, to keep the board fun, not farmable

function cleanName(s) {
  return String(s || '').replace(/[^\p{L}\p{N} ._-]/gu, '').replace(/\s+/g, ' ').trim().slice(0, 20);
}

function cleanDevice(s) {
  return String(s || '').replace(/[^a-zA-Z0-9]/g, '').slice(0, 16);
}

async function top(kv, key) {
  const rows = await kv.zrange(key, 0, 9, { rev: true, withScores: true });
  const out = [];
  for (let i = 0; i < rows.length; i += 2) {
    const member = String(rows[i]);
    out.push({ name: member.split('|')[0], amount: Math.round(Number(rows[i + 1]) || 0) });
  }
  return out;
}

export default async function handler(req, res) {
  const kv = getKv();
  const week = weekKey();
  const city = CITIES.includes(String(req.query?.city || req.body?.city)) ? String(req.query?.city || req.body?.city) : 'bengaluru';

  if (!kv) return res.status(200).json({ ok: true, kv: false, week, india: [], city: [] });

  try {
    if (req.method === 'GET') {
      const [india, cityRows] = await Promise.all([
        top(kv, `beggy:lb:${week}:india`),
        top(kv, `beggy:lb:${week}:${city}`)
      ]);
      res.setHeader('cache-control', 'public, max-age=30, s-maxage=30');
      return res.status(200).json({ ok: true, kv: true, week, india, city: cityRows });
    }

    if (req.method === 'POST') {
      const name = cleanName(req.body?.name);
      const device = cleanDevice(req.body?.device);
      const amount = Math.min(MAX_PER_ORDER, Math.max(10, Math.round(Number(req.body?.amount) || 0)));
      if (name.length < 2 || device.length < 6) return res.status(400).json({ ok: false, error: 'name_required' });

      const rlKey = `beggy:rl:${device}:${clientIp(req)}`;
      const hits = await kv.incr(rlKey);
      if (hits === 1) await kv.expire(rlKey, 3600);
      if (hits > MAX_POSTS_PER_HOUR) return res.status(429).json({ ok: false, error: 'slow_down' });

      const member = `${name}|${device}`;
      const ttl = 60 * 60 * 24 * 21;
      const indiaKey = `beggy:lb:${week}:india`;
      const cityKey = `beggy:lb:${week}:${city}`;
      await kv.zincrby(indiaKey, amount, member);
      await kv.zincrby(cityKey, amount, member);
      await kv.expire(indiaKey, ttl);
      await kv.expire(cityKey, ttl);
      return res.status(200).json({ ok: true, kv: true, week });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).end();
  } catch (err) {
    return res.status(200).json({ ok: true, kv: false, week, india: [], city: [] });
  }
}
