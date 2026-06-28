/**
 * src/db.ts
 *
 * SQLite persistence layer using Node's built-in node:sqlite module.
 * Requires: --experimental-sqlite flag on every node invocation.
 *
 * Public surface:
 *   initDb(path)              — open (or create) the database and run DDL
 *   appendBlock(block)        — INSERT a fully-verified block; throws on duplicate
 *   getAllBlocks()            — SELECT * ORDER BY idx ASC
 *   getBlockCount()          — fast COUNT(*)
 *   getLastBlock()           — highest-idx block, or null if chain is empty
 *   getLatestBlocksFromDb(n) — latest N blocks ordered by idx DESC
 *   tamperBlockData()        — TEST-ONLY: directly mutate a block's data column
 */
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
// ---------------------------------------------------------------------------
// Module-level DB handle
// ---------------------------------------------------------------------------
let _db = null;
function db() {
    if (!_db)
        throw new Error('DB not initialised — call initDb() first');
    return _db;
}
// ---------------------------------------------------------------------------
// initDb
// ---------------------------------------------------------------------------
/**
 * Open (or create) the database at `path` and run DDL.
 * Pass ':memory:' for an isolated in-memory database (used by tests).
 * Calling again replaces the current handle — safe for test isolation.
 */
export function initDb(path = 'data/chain.db') {
    if (path !== ':memory:') {
        mkdirSync(dirname(path), { recursive: true });
    }
    _db = new DatabaseSync(path);
    _db.exec(`
    CREATE TABLE IF NOT EXISTS blocks (
      idx          INTEGER PRIMARY KEY,
      hash         TEXT    NOT NULL UNIQUE,
      previousHash TEXT    NOT NULL,
      data         TEXT    NOT NULL,
      signature    TEXT    NOT NULL,
      publicKey    TEXT    NOT NULL,
      submittedAt  TEXT    NOT NULL
    )
  `);
}
// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------
export function appendBlock(block) {
    db()
        .prepare(`INSERT INTO blocks
         (idx, hash, previousHash, data, signature, publicKey, submittedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?)`)
        .run(block.idx, block.hash, block.previousHash, block.data, block.signature, block.publicKey, block.submittedAt);
}
// ---------------------------------------------------------------------------
// Read
// ---------------------------------------------------------------------------
export function getAllBlocks() {
    return db()
        .prepare('SELECT * FROM blocks ORDER BY idx ASC')
        .all();
}
export function getBlockCount() {
    const row = db()
        .prepare('SELECT COUNT(*) AS count FROM blocks')
        .get();
    return row.count;
}
export function getLastBlock() {
    const row = db()
        .prepare('SELECT * FROM blocks ORDER BY idx DESC LIMIT 1')
        .get();
    return row ?? null;
}
/**
 * Return the latest `n` blocks, ordered by idx DESC.
 * Used by GET /api/chain/latest for dashboard display.
 */
export function getLatestBlocksFromDb(n) {
    return db()
        .prepare('SELECT * FROM blocks ORDER BY idx DESC LIMIT ?')
        .all(n);
}
// ---------------------------------------------------------------------------
// TEST-ONLY helper — simulates a direct DB-level tamper
// ---------------------------------------------------------------------------
/**
 * Directly overwrite the `data` column for block `idx`.
 * Used ONLY by test/chain.test.ts to exercise tamper-detection.
 * Must never be called from application code.
 */
export function tamperBlockData(idx, newData) {
    db()
        .prepare('UPDATE blocks SET data = ? WHERE idx = ?')
        .run(newData, idx);
}
//# sourceMappingURL=db.js.map