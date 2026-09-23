// Dynamic Open Graph card for WhatsApp / X / LinkedIn link previews.
// /api/og?type=challenge&amt=457&dish=Biryani&from=Priya
// /api/og?type=ghost&amt=457&dish=Biryani&from=Priya&to=Rahul
import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

function clean(s, max, fallback) {
  const v = String(s || '').replace(/[<>"]/g, '').replace(/\s+/g, ' ').trim().slice(0, max);
  return v || fallback;
}

function clampInt(n, min, max) {
  const x = Number.parseInt(String(n), 10);
  if (!Number.isFinite(x)) return min;
  return Math.min(max, Math.max(min, x));
}

// Tiny element helper so this file needs no JSX build step.
function h(type, style, ...children) {
  const kids = children.flat().filter((c) => c !== null && c !== undefined && c !== false);
  return { type, props: { style, children: kids.length === 1 ? kids[0] : kids } };
}

export function buildCard(params) {
  const type = params.get('type') === 'ghost' ? 'ghost' : 'challenge';
  const amt = clampInt(params.get('amt') || params.get('c'), 10, 50000).toLocaleString('en-IN');
  const dish = clean(params.get('dish'), 32, 'Biryani');
  const from = clean(params.get('from'), 20, 'Someone');
  const to = clean(params.get('to'), 20, 'You');

  const orange = '#FC8019';
  const green = '#10B981';

  const top = type === 'ghost'
    ? h('div', { display: 'flex', fontSize: 34, color: '#94A3B8', letterSpacing: 2 }, 'ORDER ON THE WAY')
    : h('div', { display: 'flex', fontSize: 34, color: '#94A3B8', letterSpacing: 2 }, '100% DISCOUNT UNLOCKED');

  const headline = type === 'ghost'
    ? h('div', { display: 'flex', flexWrap: 'wrap', fontSize: 64, fontWeight: 800, color: '#F8FAFC', lineHeight: 1.1 },
        `${to}, your ${dish} is on the way`)
    : h('div', { display: 'flex', flexWrap: 'wrap', fontSize: 64, fontWeight: 800, color: '#F8FAFC', lineHeight: 1.1 },
        `${from} ordered ${dish}. Paid Rs 0.`);

  const amountRow = type === 'ghost'
    ? h('div', { display: 'flex', alignItems: 'baseline', marginTop: 28 },
        h('div', { display: 'flex', fontSize: 40, color: '#CBD5E1', marginRight: 18 }, `Ordered for you by ${from} ·`),
        h('div', { display: 'flex', fontSize: 56, fontWeight: 800, color: orange }, `Rs ${amt}`))
    : h('div', { display: 'flex', alignItems: 'baseline', marginTop: 28 },
        h('div', { display: 'flex', fontSize: 96, fontWeight: 800, color: green }, `Rs ${amt}`),
        h('div', { display: 'flex', fontSize: 40, color: '#CBD5E1', marginLeft: 20 }, 'still in the bank'));

  const cta = type === 'ghost'
    ? 'Tap to track your rider live'
    : `Think you can beat ${from}?`;

  return h('div', {
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      background: 'linear-gradient(135deg, #07090E 0%, #111520 60%, #1F263B 100%)', padding: '64px 72px',
      fontFamily: 'sans-serif'
    },
    h('div', { display: 'flex', flexDirection: 'column' },
      h('div', { display: 'flex', alignItems: 'center', marginBottom: 28 },
        h('div', { display: 'flex', fontSize: 48, fontWeight: 800, color: orange }, 'beggy'),
        h('div', { display: 'flex', fontSize: 28, color: '#64748B', marginLeft: 20 }, 'the food delivery app where nothing arrives')),
      top,
      headline,
      amountRow),
    h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
      h('div', { display: 'flex', background: orange, color: '#07090E', fontSize: 38, fontWeight: 800, padding: '18px 34px', borderRadius: 18 }, cta),
      h('div', { display: 'flex', fontSize: 30, color: '#94A3B8' }, 'beggy.vercel.app'))
  );
}

export default function handler(request) {
  try {
    const { searchParams } = new URL(request.url);
    return new ImageResponse(buildCard(searchParams), {
      width: 1200,
      height: 630,
      headers: { 'cache-control': 'public, max-age=86400, s-maxage=86400, immutable' }
    });
  } catch (e) {
    return Response.redirect(new URL('/og-order-food-for-free-v2.png', request.url), 302);
  }
}
