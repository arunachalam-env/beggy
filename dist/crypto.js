/**
 * src/crypto.ts
 *
 * All cryptographic primitives used by the evidence log.
 *
 * Design:
 *   canonicalize()    — deterministic JSON serialisation (sorted keys, recursively)
 *   hashBlock()       — SHA-256 of canonicalize(blockFields) -> lowercase hex
 *   verifySignature() — secp256k1 compact-sig verify; args are hex strings,
 *                       conversion to Uint8Array happens here so callers
 *                       never have to think about encoding.
 */
import { sha256 } from '@noble/hashes/sha2.js';
import { secp256k1 } from '@noble/curves/secp256k1.js';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils.js';
/**
 * Produce a deterministic JSON string by sorting object keys recursively.
 * Arrays preserve their order; only object keys are sorted.
 */
export function canonicalize(obj) {
    if (Array.isArray(obj)) {
        return '[' + obj.map(canonicalize).join(',') + ']';
    }
    if (obj !== null && typeof obj === 'object') {
        const rec = obj;
        const pairs = Object.keys(rec)
            .sort()
            .map(k => JSON.stringify(k) + ':' + canonicalize(rec[k]));
        return '{' + pairs.join(',') + '}';
    }
    return JSON.stringify(obj);
}
/**
 * SHA-256 of canonicalize(blockFields), returned as lowercase hex.
 */
export function hashBlock(blockFields) {
    const canonical = canonicalize(blockFields);
    const digest = sha256(new TextEncoder().encode(canonical));
    return bytesToHex(digest);
}
/**
 * Verify that `signatureHex` is a valid secp256k1 compact signature (64 bytes,
 * r||s) over SHA-256(dataToSign) made by the key identified by `publicKeyHex`.
 *
 * Returns false (never throws) on any decoding or verification failure.
 */
export function verifySignature(dataToSign, signatureHex, publicKeyHex) {
    try {
        const msgHash = sha256(new TextEncoder().encode(dataToSign));
        const sigBytes = hexToBytes(signatureHex);
        const pubKeyBytes = hexToBytes(publicKeyHex);
        return secp256k1.verify(sigBytes, msgHash, pubKeyBytes);
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=crypto.js.map