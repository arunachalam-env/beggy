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
export {};
//# sourceMappingURL=index.d.ts.map