import { BlockRecord } from './db.js';
export interface SubmitPayload {
    data: string;
    signature: string;
    publicKey: string;
}
export interface VerificationBlockResult {
    idx: number;
    hashValid: boolean;
    signatureValid: boolean;
    linkValid: boolean;
    valid: boolean;
}
export interface VerificationResult {
    valid: boolean;
    brokenAtIndex: number | null;
    blocks: VerificationBlockResult[];
}
export declare function submitReading(payload: SubmitPayload): BlockRecord;
export declare function getChain(): BlockRecord[];
export declare function getLatestBlocks(n: number): BlockRecord[];
export declare function verifyEntireChain(): VerificationResult;
//# sourceMappingURL=chain.d.ts.map