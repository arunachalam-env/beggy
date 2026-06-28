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
import { hashBlock, verifySignature } from './crypto.js';
import { appendBlock, getAllBlocks, getBlockCount, getLastBlock, getLatestBlocksFromDb, } from './db.js';
// ---------------------------------------------------------------------------
// Input validation constants
// ---------------------------------------------------------------------------
const MAX_DATA_LENGTH = 10_000; // 10 KB canonical JSON
const MAX_SIGNATURE_LENGTH = 256; // 128 hex chars = 64 bytes, allow some margin
const MAX_PUBKEY_LENGTH = 128; // 66 hex chars = 33 bytes, allow some margin
// ---------------------------------------------------------------------------
// submitReading — the only write path
// ---------------------------------------------------------------------------
/**
 * Verify the client signature, compute the block hash, and append to DB.
 *
 * Throws with .status = 400 on missing fields or invalid input.
 * Throws with .status = 403 if the signature is invalid.
 * Never persists without a valid signature.
 */
export function submitReading(payload) {
    const { data, signature, publicKey } = payload;
    if (!data || !signature || !publicKey) {
        throw Object.assign(new Error('Missing required fields: data, signature, publicKey'), { status: 400 });
    }
    // Input length validation
    if (typeof data !== 'string' || data.length > MAX_DATA_LENGTH) {
        throw Object.assign(new Error(`data must be a string of at most ${MAX_DATA_LENGTH} characters`), { status: 400 });
    }
    if (typeof signature !== 'string' || signature.length > MAX_SIGNATURE_LENGTH) {
        throw Object.assign(new Error(`signature must be a hex string of at most ${MAX_SIGNATURE_LENGTH} characters`), { status: 400 });
    }
    if (typeof publicKey !== 'string' || publicKey.length > MAX_PUBKEY_LENGTH) {
        throw Object.assign(new Error(`publicKey must be a hex string of at most ${MAX_PUBKEY_LENGTH} characters`), { status: 400 });
    }
    // Hex format validation
    if (!/^[0-9a-f]+$/i.test(signature)) {
        throw Object.assign(new Error('signature must be a valid hex string'), { status: 400 });
    }
    if (!/^[0-9a-f]+$/i.test(publicKey)) {
        throw Object.assign(new Error('publicKey must be a valid hex string'), { status: 400 });
    }
    // Verify BEFORE any DB write.
    if (!verifySignature(data, signature, publicKey)) {
        throw Object.assign(new Error('Signature verification failed'), { status: 403 });
    }
    const idx = getBlockCount();
    const last = getLastBlock();
    const previousHash = last ? last.hash : '0'.repeat(64);
    const submittedAt = new Date().toISOString();
    // Block hash commits to idx, chain-link, content, signer, and time.
    const hash = hashBlock({ idx, previousHash, data, publicKey, submittedAt });
    const block = {
        idx,
        hash,
        previousHash,
        data,
        signature,
        publicKey,
        submittedAt,
    };
    appendBlock(block);
    return block;
}
// ---------------------------------------------------------------------------
// getChain
// ---------------------------------------------------------------------------
export function getChain() {
    return getAllBlocks();
}
// ---------------------------------------------------------------------------
// getLatestBlocks
// ---------------------------------------------------------------------------
export function getLatestBlocks(n) {
    return getLatestBlocksFromDb(n);
}
// ---------------------------------------------------------------------------
// verifyEntireChain
// ---------------------------------------------------------------------------
/**
 * Recompute every hash and re-verify every signature from genesis.
 * Returns the exact brokenAtIndex (first block that fails any check).
 */
export function verifyEntireChain() {
    const blocks = getAllBlocks();
    if (blocks.length === 0) {
        return { valid: true, brokenAtIndex: null, blocks: [] };
    }
    const results = [];
    for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];
        // 1. Recompute block hash from stored fields
        const recomputed = hashBlock({
            idx: b.idx,
            previousHash: b.previousHash,
            data: b.data,
            publicKey: b.publicKey,
            submittedAt: b.submittedAt,
        });
        const hashValid = recomputed === b.hash;
        // 2. Re-verify the submitter's signature over the data field
        const signatureValid = verifySignature(b.data, b.signature, b.publicKey);
        // 3. Check chain linkage
        const expectedPrev = i === 0 ? '0'.repeat(64) : blocks[i - 1].hash;
        const linkValid = b.previousHash === expectedPrev;
        const valid = hashValid && signatureValid && linkValid;
        results.push({ idx: b.idx, hashValid, signatureValid, linkValid, valid });
    }
    const brokenIdx = results.findIndex(r => !r.valid);
    return {
        valid: brokenIdx === -1,
        brokenAtIndex: brokenIdx === -1 ? null : results[brokenIdx].idx,
        blocks: results,
    };
}
//# sourceMappingURL=chain.js.map