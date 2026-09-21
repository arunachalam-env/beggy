// middleware.js
function clampInt(n, min, max) {
  const x = Number.parseInt(String(n), 10);
  if (!Number.isFinite(x)) return min;
  return Math.min(max, Math.max(min, x));
}

function sanitize(s, max) {
  return String(s || '')
    .replace(/[<>"]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

function dishPhrase(dish) {
  const d = sanitize(dish, 40).toLowerCase();
  if (!d) return 'food';
  return d;
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const c = url.searchParams.get('c');
  const dish = url.searchParams.get('dish');
  const from = url.searchParams.get('from');

  if (!c) return;

  const amount = clampInt(c, 10, 50000);
  const name = sanitize(from, 24) || 'Someone';
  const title = `🚨 ${name} unlocked 100% DISCOUNT on ${food} — ₹${amount} kept!`;
  const desc = `Tracked a beggy rider for 11 mins. Total paid: ₹0.00. Order food for free... for the food that never comes. Beat ${name}.`;
  const canonical = `https://beggy.vercel.app/?c=${amount}&dish=${encodeURIComponent(food)}&from=${encodeURIComponent(name)}`;

  // Fetch clean static index.html without searchParams so subrequest does not re-trigger middleware logic
  const fetchUrl = new URL('/index.html', request.url);
  const res = await fetch(fetchUrl);
  const html = await res.text();
  const next = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
    .replace(/property="og:title" content="[^"]*"/i, `property="og:title" content="${title}"`)
    .replace(/property="og:description" content="[^"]*"/i, `property="og:description" content="${desc}"`)
    .replace(/property="og:url" content="[^"]*"/i, `property="og:url" content="${canonical}"`)
    .replace(/name="twitter:title" content="[^"]*"/i, `name="twitter:title" content="${title}"`)
    .replace(/name="twitter:description" content="[^"]*"/i, `name="twitter:description" content="${desc}"`)
    .replace(/name="description" content="[^"]*"/i, `name="description" content="${desc}"`);

  return new Response(next, {
    status: res.status,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=60'
    }
  });
}

export const config = { matcher: ['/', '/index.html'] };
