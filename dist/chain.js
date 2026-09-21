/**
 * src/chain.ts
 *
 * Core evidence-log logic: append, read, and verify.
 */
import { hashBlock, verifySignature } from './crypto.js';
import { appendBlock, getAllBlocks, getBlockCount, getLastBlock, getLatestBlocksFromDb, } from './db.js';
const MAX_DATA_LENGTH = 10_000;
const MAX_SIGNATURE_LENGTH = 256;
const MAX_PUBKEY_LENGTH = 128;
export function submitReading(payload) {
    const { data, signature, publicKey } = payload;
    if (!data || !signature || !publicKey) {
        throw Object.assign(new Error('Missing required fields: data, signature, publicKey'), { status: 400 });
    }
    if (typeof data !== 'string' || data.length > MAX_DATA_LENGTH) {
        throw Object.assign(new Error(`data must be a string of at most ${MAX_DATA_LENGTH} characters`), { status: 400 });
    }
    if (typeof signature !== 'string' || signature.length > MAX_SIGNATURE_LENGTH) {
        throw Object.assign(new Error(`signature must be a hex string of at most ${MAX_SIGNATURE_LENGTH} characters`), { status: 400 });
    }
    if (typeof publicKey !== 'string' || publicKey.length > MAX_PUBKEY_LENGTH) {
        throw Object.assign(new Error(`publicKey must be a hex string of at most ${MAX_PUBKEY_LENGTH} characters`), { status: 400 });
    }
    if (!/^[0-9a-f]+$/i.test(signature)) {
        throw Object.assign(new Error('signature must be a valid hex string'), { status: 400 });
    }
    if (!/^[0-9a-f]+$/i.test(publicKey)) {
        throw Object.assign(new Error('publicKey must be a valid hex string'), { status: 400 });
    }
    if (!verifySignature(data, signature, publicKey)) {
        throw Object.assign(new Error('Signature verification failed'), { status: 403 });
    }
    const idx = getBlockCount();
    const last = getLastBlock();
    const previousHash = last ? last.hash : '0'.repeat(64);
    const submittedAt = new Date().toISOString();
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
export function getChain() {
    return getAllBlocks();
}
export function getLatestBlocks(n) {
    return getLatestBlocksFromDb(n);
}
export function verifyEntireChain() {
    const blocks = getAllBlocks();
    if (blocks.length === 0) {
        return { valid: true, brokenAtIndex: null, blocks: [] };
    }
    const results = [];
    for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];
        const recomputed = hashBlock({
            idx: b.idx,
            previousHash: b.previousHash,
            data: b.data,
            publicKey: b.publicKey,
            submittedAt: b.submittedAt,
        });
        const hashValid = recomputed === b.hash;
        const signatureValid = verifySignature(b.data, b.signature, b.publicKey);
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
export function getChainStats() {
    const blocks = getAllBlocks();
    let totalSaved = 0;
    for (const b of blocks) {
        try {
            const parsed = JSON.parse(b.data);
            if (typeof parsed.savedAmount === 'number' && !isNaN(parsed.savedAmount)) {
                totalSaved += parsed.savedAmount;
            }
            else if (typeof parsed.amount === 'number' && !isNaN(parsed.amount)) {
                totalSaved += parsed.amount;
            }
        }
        catch {
            // ignore non-json payload
        }
    }
    return { totalSaved, count: blocks.length };
}
//# sourceMappingURL=chain.js.map