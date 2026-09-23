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
  const d = sanitize(dish, 40);
  if (!d) return 'food';
  return d;
}

export default async function middleware(request) {
  try {
    const url = new URL(request.url);
    const c = url.searchParams.get('c');
    const g = url.searchParams.get('g');
    const dish = url.searchParams.get('dish');
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');

    if (!c && !g) return;

    const food = dishPhrase(dish);
    const name = sanitize(from, 20) || 'Someone';
    let title, desc, canonical, image;

    if (g) {
      // Ghost order: someone "ordered" food for a friend
      const amount = clampInt(g, 10, 50000);
      const friend = sanitize(to, 20) || 'You';
      title = `🛵 ${friend}, your ${food} is on the way`;
      desc = `${name} just ordered ${food} (₹${amount}) for you. Tap to track your rider live.`;
      canonical = `https://beggy.vercel.app/?g=${amount}&dish=${encodeURIComponent(food)}&from=${encodeURIComponent(name)}&to=${encodeURIComponent(friend)}`;
      image = `https://beggy.vercel.app/api/og?type=ghost&amt=${amount}&dish=${encodeURIComponent(food)}&from=${encodeURIComponent(name)}&to=${encodeURIComponent(friend)}`;
    } else {
      const amount = clampInt(c, 10, 50000);
      title = `${name} ordered ${food} and paid ₹0. ₹${amount} still in the bank.`;
      desc = `The rider came. The food didn't. ${name} kept ₹${amount}. Think you can beat that?`;
      canonical = `https://beggy.vercel.app/?c=${amount}&dish=${encodeURIComponent(food)}&from=${encodeURIComponent(name)}`;
      image = `https://beggy.vercel.app/api/og?type=challenge&amt=${amount}&dish=${encodeURIComponent(food)}&from=${encodeURIComponent(name)}`;
    }
    const imageAttr = image.replace(/&/g, '&amp;');

    // Fetch clean static index.html without searchParams so subrequest does not re-trigger middleware logic
    const fetchUrl = new URL('/index.html', request.url);
    const res = await fetch(fetchUrl);
    if (!res || !res.ok) return;

    const html = await res.text();
    const next = html
      .replace(/<title>[\s\S]*?<\/title>/i, () => `<title>${title}</title>`)
      .replace(/property="og:title" content="[^"]*"/i, () => `property="og:title" content="${title}"`)
      .replace(/property="og:description" content="[^"]*"/i, () => `property="og:description" content="${desc}"`)
      .replace(/property="og:url" content="[^"]*"/i, () => `property="og:url" content="${canonical}"`)
      .replace(/property="og:image" content="[^"]*"/i, () => `property="og:image" content="${imageAttr}"`)
      .replace(/property="og:image:secure_url" content="[^"]*"/i, () => `property="og:image:secure_url" content="${imageAttr}"`)
      .replace(/name="twitter:title" content="[^"]*"/i, () => `name="twitter:title" content="${title}"`)
      .replace(/name="twitter:description" content="[^"]*"/i, () => `name="twitter:description" content="${desc}"`)
      .replace(/name="twitter:image" content="[^"]*"/i, () => `name="twitter:image" content="${imageAttr}"`)
      .replace(/name="description" content="[^"]*"/i, () => `name="description" content="${desc}"`);

    return new Response(next, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=60'
      }
    });
  } catch (err) {
    // If anything fails in edge middleware, return undefined to gracefully fallback to static file serving
    return;
  }
}

export const config = { matcher: ['/', '/index.html'] };
