/**
 * src/keystore.ts
 *
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  DEV-ONLY — returns private keys in the HTTP response body.  ║
 * ║  Remove / disable this entire file before production.        ║
 * ║  Phase 2 will replace this with per-stakeholder key mgmt.    ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Purpose: let a developer (or the frontend during local dev) obtain
 * a fresh secp256k1 keypair so they can sign readings without running
 * a separate key-generation tool.
 *
 * The private key is returned once and NEVER stored server-side.
 */
export interface Keypair {
    publicKey: string;
    privateKey: string;
}
export declare function generateKeypair(): Keypair;
//# sourceMappingURL=keystore.d.ts.map