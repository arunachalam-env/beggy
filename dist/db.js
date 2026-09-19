/**
 * src/db.ts
 *
 * Universal SQLite persistence layer supporting both Node.js (node:sqlite)
 * and Bun (bun:sqlite) seamlessly.
 */
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
let DatabaseConstructor = null;
if (typeof process !== 'undefined' && process.versions?.bun) {
    // @ts-ignore
    const { Database } = await import('bun:sqlite');
    DatabaseConstructor = Database;
}
else {
    try {
        const { DatabaseSync } = await import('node:sqlite');
        DatabaseConstructor = DatabaseSync;
    }
    catch {
        // @ts-ignore
        const { Database } = await import('bun:sqlite');
        DatabaseConstructor = Database;
    }
}
let _db = null;
function db() {
    if (!_db) {
        throw new Error('DB not initialised — call initDb() first');
    }
    return _db;
}
/**
 * Open (or create) the database at `path` and run DDL.
 * Pass ':memory:' for an isolated in-memory database (used by tests).
 */
export function initDb(path = 'data/chain.db') {
    if (path !== ':memory:') {
        mkdirSync(dirname(path), { recursive: true });
    }
    _db = new DatabaseConstructor(path);
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
/**
 * Cleanly close the database handle if open.
 */
export function closeDb() {
    if (_db) {
        try {
            _db.close();
        }
        catch {
            // Ignore if already closed
        }
        _db = null;
    }
}
export function appendBlock(block) {
    db()
        .prepare(`INSERT INTO blocks
         (idx, hash, previousHash, data, signature, publicKey, submittedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?)`)
        .run(block.idx, block.hash, block.previousHash, block.data, block.signature, block.publicKey, block.submittedAt);
}
export function getAllBlocks() {
    return db()
        .prepare('SELECT * FROM blocks ORDER BY idx ASC')
        .all();
}
export function getBlockCount() {
    const row = db()
        .prepare('SELECT COUNT(*) AS count FROM blocks')
        .get();
    return row ? Number(row.count) : 0;
}
export function getLastBlock() {
    const row = db()
        .prepare('SELECT * FROM blocks ORDER BY idx DESC LIMIT 1')
        .get();
    return row ?? null;
}
export function getLatestBlocksFromDb(n) {
    return db()
        .prepare('SELECT * FROM blocks ORDER BY idx DESC LIMIT ?')
        .all(n);
}
/**
 * Direct overwrite of data column for testing tamper detection.
 */
export function tamperBlockData(idx, newData) {
    if (process.env.NODE_ENV === 'production') {
        throw new Error('tamperBlockData is strictly forbidden in production');
    }
    db()
        .prepare('UPDATE blocks SET data = ? WHERE idx = ?')
        .run(newData, idx);
}
//# sourceMappingURL=db.js.map