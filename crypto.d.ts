/**
 * src/crypto.ts
 *
 * All cryptographic primitives used by the evidence log.
 *
 * Design:
 *   canonicalize()  — deterministic JSON serialisation (sorted keys, recursively)
 *   hashBlock()     — SHA-256 of canonicalize(blockFields) → lowercase hex
 *   verifySignature() — secp256k1 compact-sig verify; args are hex strings,
 *                       conversion to Uint8Array happens here so callers
 *                       never have to think about encoding.
 *
 * Both client (script.js) and server use the same canonicalize algorithm,
 * so signer and verifier always agree on which bytes were signed.
 */
/**
 * Produce a deterministic JSON string by sorting object keys recursively.
 * Arrays preserve their order; only object keys are sorted.
 *
 * This MUST be kept in sync with the client-side copy in script.js.
 */
export declare function canonicalize(obj: unknown): string;
/**
 * SHA-256 of canonicalize(blockFields), returned as lowercase hex.
 * blockFields contains: { idx, previousHash, data, publicKey, submittedAt }.
 */
export declare function hashBlock(blockFields: Record<string, unknown>): string;
/**
 * Verify that `signatureHex` is a valid secp256k1 compact signature (64 bytes,
 * r‖s) over SHA-256(dataToSign) made by the key identified by `publicKeyHex`.
 *
 * Returns false (never throws) on any decoding or verification failure.
 */
export declare function verifySignature(dataToSign: string, signatureHex: string, publicKeyHex: string): boolean;
//# sourceMappingURL=crypto.d.ts.map