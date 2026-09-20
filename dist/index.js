/**
 * src/index.ts
 *
 * Beggy Express server — serves the Dopamine Food Delivery frontend,
 * Anti-Spending Vault, and the Evidence Log API.
 */
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { initDb, getBlockCount, closeDb } from './db.js';
import { submitReading, getChain, getLatestBlocks, verifyEntireChain } from './chain.js';
import { generateKeypair } from './keystore.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const isDev = process.env.NODE_ENV !== 'production';
// ── Security & CSP ───────────────────────────────────────────────────────────
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: [
                "'self'",
                "'unsafe-inline'",
                'https://esm.sh',
                'https://cdn.jsdelivr.net',
                'https://unpkg.com',
            ],
            styleSrc: [
                "'self'",
                "'unsafe-inline'",
                'https://fonts.googleapis.com',
                'https://cdn.jsdelivr.net',
                'https://unpkg.com',
            ],
            fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
            connectSrc: [
                "'self'",
                'https://esm.sh',
                'https://router.project-osrm.org',
                'https://vitals.vercel-insights.com',
                'https://server.arcgisonline.com',
                'https://api.qrserver.com',
                'https://*.unsplash.com',
                'https://*.tile.openstreetmap.org',
                'https://*.basemaps.cartocdn.com',
                'https://cartodb-basemaps-*.global.ssl.fastly.net',
            ],
            imgSrc: [
                "'self'",
                'data:',
                'https:',
                'blob:',
                'https://server.arcgisonline.com',
                'https://*.tile.openstreetmap.org',
                'https://*.basemaps.cartocdn.com',
            ],
        },
    },
    crossOriginEmbedderPolicy: false,
}));
// ── Rate Limiting ───────────────────────────────────────────────────────────
const mutationLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { ok: false, error: 'Too many requests — try again later' },
});
// ── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: '100kb' }));
if (isDev) {
    app.use((_req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        if (_req.method === 'OPTIONS') {
            res.sendStatus(204);
            return;
        }
        next();
    });
}
// ── Static Frontend Resolution ───────────────────────────────────────────────
function resolvePublicDir() {
    const candidate1 = join(__dirname, '..', '..', 'public');
    if (existsSync(candidate1))
        return candidate1;
    const candidate2 = join(__dirname, '..', 'public');
    if (existsSync(candidate2))
        return candidate2;
    const candidate3 = join(__dirname, 'public');
    if (existsSync(candidate3))
        return candidate3;
    return join(process.cwd(), 'public');
}
const publicDir = resolvePublicDir();
app.use(express.static(publicDir));
// ── API Routes ───────────────────────────────────────────────────────────────
/** GET /api/health — server health check */
app.get('/api/health', (_req, res) => {
    res.json({
        ok: true,
        app: 'Beggy - Dopamine Food Delivery & Anti-Spending Vault',
        uptime: process.uptime(),
        blocks: getBlockCount(),
        timestamp: new Date().toISOString(),
        env: isDev ? 'development' : 'production',
    });
});
/** POST /api/readings — accept a signed reading or savings receipt, verify, and persist */
app.post('/api/readings', mutationLimiter, (req, res) => {
    try {
        const block = submitReading(req.body);
        res.status(201).json({ ok: true, block });
    }
    catch (err) {
        const e = err;
        res.status(e.status ?? 500).json({ ok: false, error: e.message });
    }
});
/** GET /api/chain — return all blocks ordered by idx ASC */
app.get('/api/chain', (_req, res) => {
    res.json(getChain());
});
/** GET /api/chain/latest — return the latest N blocks (default 10) */
app.get('/api/chain/latest', (req, res) => {
    const rawN = parseInt(req.query.n, 10);
    const n = isNaN(rawN) ? 10 : Math.min(Math.max(rawN, 1), 100);
    res.json(getLatestBlocks(n));
});
/** GET /api/chain/verify — recompute hashes and signatures from genesis */
app.get('/api/chain/verify', (_req, res) => {
    res.json(verifyEntireChain());
});
/** POST /api/keys/register — dev-only keypair generation */
app.post('/api/keys/register', mutationLimiter, (_req, res) => {
    if (!isDev) {
        res.status(403).json({ ok: false, error: 'Key registration endpoint disabled in production' });
        return;
    }
    res.json(generateKeypair());
});
// ── SPA Fallback ─────────────────────────────────────────────────────────────
app.get('*', (_req, res) => {
    res.sendFile(join(publicDir, 'index.html'));
});
// ── Start ────────────────────────────────────────────────────────────────────
initDb();
const PORT = Number(process.env.PORT ?? 3000);
const server = app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`  BEGGY — Dopamine Food Delivery & Anti-Spending Vault`);
    console.log(`  http://localhost:${PORT}`);
    console.log(`  Environment: ${isDev ? 'development' : 'production'}`);
    console.log(`======================================================\n`);
});
// ── Graceful Shutdown ────────────────────────────────────────────────────────
function shutdown(signal) {
    console.log(`\n${signal} received — shutting down gracefully...`);
    server.close(() => {
        closeDb();
        console.log('Database closed. Server shut down cleanly.');
        process.exit(0);
    });
    setTimeout(() => {
        closeDb();
        process.exit(1);
    }, 10_000).unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
export { app, server };
//# sourceMappingURL=index.js.map