/**
 * src/chain.ts
 *
 * Core evidence-log logic: append, read, and verify.
 *
 * submitReading() is the ONLY path to persist a block.
 * It always verifies the client signature before touching the DB.
 * There is no mock-data shortcut that bypasses verification.
 *
 * verifyEntireChain() walks every block from genesis, recomputes each
 * hash AND re-verifies each signature, and reports the exact index
 * where something is broken.
 */
import { type StoredBlock } from './db.js';
/** Shape of the JSON body POSTed to /api/readings */
export interface ReadingPayload {
    /** canonical JSON string of the reading fields — this is what was signed */
    data: string;
    /** hex-encoded compact secp256k1 signature (64 bytes, r‖s) over SHA-256(data) */
    signature: string;
    /** hex-encoded compressed secp256k1 public key (33 bytes) */
    publicKey: string;
}
export interface VerifyBlockResult {
    idx: number;
    hashValid: boolean;
    signatureValid: boolean;
    linkValid: boolean;
    valid: boolean;
}
export interface ChainVerification {
    valid: boolean;
    brokenAtIndex: number | null;
    blocks: VerifyBlockResult[];
}
/**
 * Verify the client signature, compute the block hash, and append to DB.
 *
 * Throws with .status = 400 on missing fields or invalid input.
 * Throws with .status = 403 if the signature is invalid.
 * Never persists without a valid signature.
 */
export declare function submitReading(payload: ReadingPayload): StoredBlock;
export declare function getChain(): StoredBlock[];
export declare function getLatestBlocks(n: number): StoredBlock[];
/**
 * Recompute every hash and re-verify every signature from genesis.
 * Returns the exact brokenAtIndex (first block that fails any check).
 */
export declare function verifyEntireChain(): ChainVerification;
//# sourceMappingURL=chain.d.ts.map