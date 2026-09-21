import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function buildSvg(b64Image, b64Logo) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Corporate Obsidian Palette -->
    <linearGradient id="bg-corporate" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06090F" />
      <stop offset="50%" stop-color="#0A0F1A" />
      <stop offset="100%" stop-color="#05070D" />
    </linearGradient>

    <!-- Seamless Blend for the Right Image -->
    <linearGradient id="image-blend-left" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#06090F" stop-opacity="1" />
      <stop offset="25%" stop-color="#06090F" stop-opacity="0.95" />
      <stop offset="60%" stop-color="#06090F" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#06090F" stop-opacity="0" />
    </linearGradient>

    <linearGradient id="image-blend-bottom" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#06090F" stop-opacity="0" />
      <stop offset="70%" stop-color="#06090F" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#06090F" stop-opacity="1" />
    </linearGradient>

    <linearGradient id="card-surface" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#111724" stop-opacity="0.96" />
      <stop offset="100%" stop-color="#0C101A" stop-opacity="0.96" />
    </linearGradient>

    <linearGradient id="emerald-banner" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#052E1D" />
      <stop offset="100%" stop-color="#0A3F28" />
    </linearGradient>

    <!-- Subtle Institutional Dot Grid -->
    <pattern id="corp-grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="#334155" fill-opacity="0.25" />
    </pattern>

    <!-- Refined Drop Shadow -->
    <filter id="corp-shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="10" stdDeviation="18" flood-color="#000000" flood-opacity="0.75" />
    </filter>
  </defs>

  <!-- 1. Background -->
  <rect width="1200" height="630" fill="url(#bg-corporate)" />

  <!-- 2. The High-Tech Image with Flash & Glowing Holographic Elements on Right -->
  ${b64Image ? `
  <g transform="translate(490, 0)">
    <!-- High-tech cyber scooter + holographic HUD + floating green rupee flash -->
    <image href="data:image/jpeg;base64,${b64Image}" x="0" y="0" width="710" height="630" preserveAspectRatio="xMidYMid slice" opacity="0.92" />
    <!-- Gradient blend over left edge of image -->
    <rect x="-2" y="0" width="280" height="630" fill="url(#image-blend-left)" />
    <!-- Gradient blend over bottom edge -->
    <rect x="0" y="440" width="710" height="190" fill="url(#image-blend-bottom)" />
  </g>` : ''}

  <!-- Left grid overlay -->
  <rect width="640" height="630" fill="url(#corp-grid)" />

  <!-- Perimeter Hairline Border -->
  <rect x="18" y="18" width="1164" height="594" rx="16" fill="none" stroke="#1E293B" stroke-width="1.2" />

  <!-- 3. Header Bar -->
  <g transform="translate(46, 32)">
    <!-- Official Beggy Logo -->
    ${b64Logo ? `
    <image href="data:image/png;base64,${b64Logo}" x="0" y="0" width="44" height="52" preserveAspectRatio="xMidYMid meet" />
    <text x="56" y="34" font-family="Segoe UI, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#FFFFFF" letter-spacing="1">BEGGY</text>
    ` : `
    <rect x="0" y="6" width="36" height="36" rx="8" fill="#FF5500"/>
    <text x="18" y="31" font-family="Segoe UI, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#FFFFFF" text-anchor="middle">B</text>
    <text x="48" y="32" font-family="Segoe UI, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#FFFFFF" letter-spacing="1">BEGGY</text>
    `}

    <!-- Flash Shock Pill on Right -->
    <g transform="translate(860, 10)">
      <rect x="0" y="0" width="248" height="34" rx="17" fill="#241008" fill-opacity="0.92" stroke="#FF5500" stroke-width="1.2"/>
      <text x="18" y="22" font-family="Segoe UI, -apple-system, sans-serif" font-size="12" font-weight="900" fill="#FFAA00" letter-spacing="0.8">
        ⚡ 100% DISCOUNT UNLOCKED
      </text>
    </g>
  </g>

  <!-- 4. Left Section: Corporate Statement & Financial Bill Card -->
  <g transform="translate(46, 90)">
    <!-- User Attribution & Subhead -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="134" height="22" rx="4" fill="#151F30" stroke="#25354D" stroke-width="1"/>
      <text x="10" y="15" font-family="Segoe UI, -apple-system, sans-serif" font-size="11" font-weight="900" fill="#38BDF8" letter-spacing="1">
        USER: DEEPAK
      </text>
      <text x="146" y="15" font-family="Segoe UI, -apple-system, sans-serif" font-size="10" font-weight="800" fill="#64748B" letter-spacing="1.5">
        // STATEMENT OF NON-PURCHASE // REF: WILLPOWER-280
      </text>
    </g>

    <!-- THE PUNCHLINE HEADLINE: ORDER FOOD FOR FREE. -->
    <text x="0" y="58" font-family="Segoe UI, -apple-system, sans-serif" font-size="38" font-weight="900" fill="#FFFFFF" letter-spacing="-0.5">
      ORDER FOOD FOR FREE.
    </text>

    <!-- Corporate Settlement Card -->
    <g transform="translate(0, 72)">
      <rect x="0" y="0" width="536" height="332" rx="14" fill="url(#card-surface)" stroke="#1E293B" stroke-width="1.2" filter="url(#corp-shadow)"/>

      <!-- Preserved Capital Banner with ONLY amount in vibrant green and more breadth -->
      <g transform="translate(18, 18)">
        <rect x="0" y="0" width="500" height="78" rx="8" fill="#0A0E17" stroke="#1E293B" stroke-width="1.2"/>
        <text x="18" y="24" font-family="Segoe UI, -apple-system, sans-serif" font-size="10" font-weight="800" fill="#94A3B8" letter-spacing="1.5">
          NET CAPITAL RETAINED IN LIQUID ACCOUNT:
        </text>
        <text x="18" y="60" font-family="Segoe UI, -apple-system, Impact, sans-serif" font-size="38" font-weight="950" fill="#00F59B" letter-spacing="1">
          +₹280.00
        </text>
        <text x="216" y="58" font-family="Segoe UI, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#64748B">
          (100.0% OF ORDER RETAINED IN BANK 💸)
        </text>
      </g>

      <!-- Ledger Table -->
      <g transform="translate(18, 106)">
        <rect x="0" y="0" width="500" height="206" rx="8" fill="#0A0E17" stroke="#161F2E" stroke-width="1"/>
        
        <!-- Table Header -->
        <text x="16" y="24" font-family="Segoe UI, -apple-system, sans-serif" font-size="11" font-weight="800" fill="#64748B" letter-spacing="1">
          ITEM / TELEMETRY
        </text>
        <text x="484" y="24" font-family="Segoe UI, -apple-system, sans-serif" font-size="11" font-weight="800" fill="#64748B" text-anchor="end" letter-spacing="1">
          SETTLEMENT
        </text>
        <line x1="16" y1="34" x2="484" y2="34" stroke="#161F2E" stroke-width="1"/>

        <!-- Row 1: Dish -->
        <text x="16" y="58" font-family="Segoe UI, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#F1F5F9">
          🍗 Requisition: Crispy Peri Peri Fries
        </text>
        <text x="484" y="58" font-family="Segoe UI, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#64748B" text-anchor="end" text-decoration="line-through">
          ₹280.00
        </text>

        <!-- Row 2: Coupon WILLPOWER100 -->
        <text x="16" y="86" font-family="Segoe UI, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F59E0B">
          🏷️ Override Coupon: WILLPOWER100
        </text>
        <text x="484" y="86" font-family="Segoe UI, -apple-system, sans-serif" font-size="13" font-weight="800" fill="#F59E0B" text-anchor="end">
          -100.0% (-₹280.00)
        </text>

        <!-- Row 3: Telemetry Duration -->
        <text x="16" y="114" font-family="Segoe UI, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#94A3B8">
          🛵 Beggy Transit Duration: 11 mins
        </text>
        <text x="484" y="114" font-family="Segoe UI, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#38BDF8" text-anchor="end">
          Gate Reached • Ghosted
        </text>

        <!-- Row 4: Caloric Intake -->
        <text x="16" y="142" font-family="Segoe UI, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#94A3B8">
          🥗 Delivered Caloric Intake
        </text>
        <text x="484" y="142" font-family="Segoe UI, -apple-system, sans-serif" font-size="13" font-weight="800" fill="#10B981" text-anchor="end">
          0 kcal
        </text>

        <line x1="16" y1="154" x2="484" y2="154" stroke="#161F2E" stroke-width="1"/>

        <!-- Row 5: Final Settlement Total -->
        <text x="16" y="184" font-family="Segoe UI, -apple-system, sans-serif" font-size="15" font-weight="900" fill="#FFFFFF" letter-spacing="0.5">
          NET CAPITAL PAID:
        </text>
        <text x="484" y="184" font-family="Segoe UI, -apple-system, sans-serif" font-size="17" font-weight="900" fill="#10B981" text-anchor="end">
          ₹0.00 (100% SAVED)
        </text>
      </g>

      <!-- Credible Audit Stamp -->
      <g transform="translate(336, 16) rotate(-4)">
        <rect x="-6" y="-6" width="186" height="34" rx="4" fill="#1A0606" stroke="#EF4444" stroke-width="1.8" stroke-dasharray="5 3"/>
        <text x="87" y="17" font-family="Segoe UI, -apple-system, sans-serif" font-size="11" font-weight="900" fill="#EF4444" letter-spacing="1.2" text-anchor="middle">
          AUDIT VERIFIED • 0 KCAL
        </text>
      </g>
    </g>
  </g>

  <!-- 5. THE BOTTOMLINE PUNCHLINE (AS USER REQUESTED) -->
  <g transform="translate(46, 520)">
    <rect x="0" y="0" width="1108" height="54" rx="8" fill="#090F1C" stroke="#25384F" stroke-width="1.4"/>
    
    <!-- Outcome Tag -->
    <rect x="14" y="11" width="76" height="32" rx="4" fill="#1E293B"/>
    <text x="52" y="32" font-family="Segoe UI, -apple-system, sans-serif" font-size="11" font-weight="900" fill="#38BDF8" text-anchor="middle" letter-spacing="1">
      OUTCOME
    </text>

    <!-- The Punchline requested by user -->
    <text x="104" y="34" font-family="Segoe UI, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#F8FAFC" letter-spacing="0.8">
      ...FOR THE FOOD THAT NEVER COMES.
    </text>

    <!-- Right link / CTA -->
    <text x="1088" y="33" font-family="Segoe UI, -apple-system, sans-serif" font-size="13" font-weight="800" fill="#10B981" text-anchor="end" letter-spacing="1">
      BEGGY.VERCEL.APP ➔
    </text>
  </g>

  <!-- 6. Corporate Meta Footer -->
  <g transform="translate(46, 600)">
    <text x="0" y="0" font-family="Segoe UI, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#64748B">
      #Beggy #bwiggy #SaveMoney #100PercentOff #Discipline • Beggy Financial Discipline Systems • 100% Free
    </text>
    <text x="1108" y="0" font-family="Segoe UI, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#94A3B8" text-anchor="end">
      Tracked 11m • Total Paid: ₹0.00 • Net Retained: ₹280.00
    </text>
  </g>
</svg>
`;
}

async function render() {
  const rootDir = path.resolve(__dirname, '..');
  const imgPath = path.join(rootDir, 'public', 'hitech-preview.jpg');
  const logoPath = path.join(rootDir, 'public', 'logo.png');

  let b64Image = '';
  if (fs.existsSync(imgPath)) {
    b64Image = fs.readFileSync(imgPath).toString('base64');
  }

  let b64Logo = '';
  if (fs.existsSync(logoPath)) {
    b64Logo = fs.readFileSync(logoPath).toString('base64');
  }

  const svg = buildSvg(b64Image, b64Logo);
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    font: {
      loadSystemFonts: true,
      defaultFontFamily: 'Segoe UI'
    }
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  const pubPath = path.join(rootDir, 'public', 'og-1200x630.png');
  const docsPath = path.join(rootDir, 'docs', 'og-1200x630.png');

  fs.writeFileSync(pubPath, pngBuffer);
  fs.writeFileSync(docsPath, pngBuffer);

  console.log(`Successfully generated updated og-1200x630.png (${pngBuffer.length} bytes) to:`);
  console.log(' - ' + pubPath);
  console.log(' - ' + docsPath);
}

render().catch(console.error);
