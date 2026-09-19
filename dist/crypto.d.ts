export interface BlockFields {
    idx: number;
    previousHash: string;
    data: string;
    publicKey: string;
    submittedAt: string;
}
/**
 * Produce a deterministic JSON string by sorting object keys recursively.
 * Arrays preserve their order; only object keys are sorted.
 */
export declare function canonicalize(obj: any): string;
/**
 * SHA-256 of canonicalize(blockFields), returned as lowercase hex.
 */
export declare function hashBlock(blockFields: BlockFields): string;
/**
 * Verify that `signatureHex` is a valid secp256k1 compact signature (64 bytes,
 * r||s) over SHA-256(dataToSign) made by the key identified by `publicKeyHex`.
 *
 * Returns false (never throws) on any decoding or verification failure.
 */
export declare function verifySignature(dataToSign: string, signatureHex: string, publicKeyHex: string): boolean;
//# sourceMappingURL=crypto.d.ts.map