export interface BlockRecord {
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
 */
export declare function initDb(path?: string): void;
/**
 * Cleanly close the database handle if open.
 */
export declare function closeDb(): void;
export declare function appendBlock(block: BlockRecord): void;
export declare function getAllBlocks(): BlockRecord[];
export declare function getBlockCount(): number;
export declare function getLastBlock(): BlockRecord | null;
export declare function getLatestBlocksFromDb(n: number): BlockRecord[];
/**
 * Direct overwrite of data column for testing tamper detection.
 */
export declare function tamperBlockData(idx: number, newData: string): void;
//# sourceMappingURL=db.d.ts.map