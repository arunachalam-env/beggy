/**
 * src/index.ts
 *
 * Express server — serves the static frontend AND the evidence-log API.
 * One port for everything; no separate static server needed in production.
 *
 * Routes:
 *   POST /api/readings       submit a signed reading
 *   GET  /api/chain          full evidence chain (array of blocks)
 *   GET  /api/chain/latest   latest N blocks (default 10)
 *   GET  /api/chain/verify   recompute all hashes + sigs from genesis
 *   GET  /api/health         server health check
 *   POST /api/keys/register  DEV-ONLY: generate a secp256k1 keypair
 *
 * PORT is read from process.env.PORT — never hardcoded.
 * NODE_OPTIONS=--experimental-sqlite must be set when running.
 */
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { initDb, getBlockCount } from './db.js';
import { submitReading, getChain, getLatestBlocks, verifyEntireChain } from './chain.js';
import { generateKeypair } from './keystore.js'; // DEV-ONLY
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const isDev = process.env.NODE_ENV !== 'production';
// ── Security ────────────────────────────────────────────────────────────────
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://esm.sh"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            connectSrc: ["'self'", "https://esm.sh"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));
// ── Rate Limiting ───────────────────────────────────────────────────────────
const mutationLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { ok: false, error: 'Too many requests — try again later' },
});
// ── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: '100kb' }));
// CORS — allow the old local PS1 server (port 8080) to reach this API during
// local development; in production everything is same-origin.
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
// Serve static frontend files from public/
// At runtime, compiled JS is in dist/src/, so public/ is ../../public relative to __dirname
const publicDir = join(__dirname, '..', '..', 'public');
app.use(express.static(publicDir));
// ── API routes ──────────────────────────────────────────────────────────────
/** GET /api/health — server health check */
app.get('/api/health', (_req, res) => {
    res.json({
        ok: true,
        uptime: process.uptime(),
        blocks: getBlockCount(),
        timestamp: new Date().toISOString(),
        env: isDev ? 'development' : 'production',
    });
});
/** POST /api/readings — accept a signed reading, verify, and persist */
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
    const n = Math.min(Math.max(parseInt(req.query.n) || 10, 1), 100);
    res.json(getLatestBlocks(n));
});
/**
 * GET /api/chain/verify — recompute every hash and signature from genesis.
 * Returns { valid, brokenAtIndex, blocks: [{ idx, hashValid, signatureValid, linkValid, valid }] }
 */
app.get('/api/chain/verify', (_req, res) => {
    res.json(verifyEntireChain());
});
/**
 * POST /api/keys/register — DEV-ONLY keypair generation.
 * Returns { publicKey, privateKey }. Remove before production.
 */
app.post('/api/keys/register', mutationLimiter, (_req, res) => {
    // DEV-ONLY — see src/keystore.ts
    res.json(generateKeypair());
});
// ── SPA fallback ────────────────────────────────────────────────────────────
app.get('*', (_req, res) => {
    res.sendFile(join(publicDir, 'index.html'));
});
// ── Start ───────────────────────────────────────────────────────────────────
initDb();
const PORT = Number(process.env.PORT ?? 3000);
const server = app.listen(PORT, () => {
    console.log(`\nParavanar Evidence Log — Phase 1`);
    console.log(`  Environment: ${isDev ? 'development' : 'production'}`);
    console.log(`  http://localhost:${PORT}            ← frontend`);
    console.log(`  GET  /api/health                   ← health check`);
    console.log(`  POST /api/readings                 ← submit signed reading`);
    console.log(`  GET  /api/chain                    ← full chain`);
    console.log(`  GET  /api/chain/latest?n=10        ← latest blocks`);
    console.log(`  GET  /api/chain/verify             ← verify integrity`);
    console.log(`  POST /api/keys/register  [DEV]     ← generate keypair\n`);
});
// ── Graceful shutdown ───────────────────────────────────────────────────────
function shutdown(signal) {
    console.log(`\n${signal} received — shutting down gracefully...`);
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
    // Force exit after 10s if connections hang
    setTimeout(() => process.exit(1), 10_000).unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
//# sourceMappingURL=index.js.map