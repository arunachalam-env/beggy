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
export interface StoredBlock {
    idx: number;
    hash: string;
    previousHash: string;
    data: string;
    signature: string;
    publicKey: string;
    submittedAt: string;
}
/**
 * Open (or create) the database at `path` and run DDL.
 * Pass ':memory:' for an isolated in-memory database (used by tests).
 * Calling again replaces the current handle — safe for test isolation.
 */
export declare function initDb(path?: string): void;
export declare function appendBlock(block: StoredBlock): void;
export declare function getAllBlocks(): StoredBlock[];
export declare function getBlockCount(): number;
export declare function getLastBlock(): StoredBlock | null;
/**
 * Return the latest `n` blocks, ordered by idx DESC.
 * Used by GET /api/chain/latest for dashboard display.
 */
export declare function getLatestBlocksFromDb(n: number): StoredBlock[];
/**
 * Directly overwrite the `data` column for block `idx`.
 * Used ONLY by test/chain.test.ts to exercise tamper-detection.
 * Must never be called from application code.
 */
export declare function tamperBlockData(idx: number, newData: string): void;
//# sourceMappingURL=db.d.ts.map