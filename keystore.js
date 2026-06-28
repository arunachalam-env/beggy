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
import { secp256k1 } from '@noble/curves/secp256k1.js';
import { bytesToHex } from '@noble/hashes/utils.js';
// DEV-ONLY
export function generateKeypair() {
    const privBytes = secp256k1.utils.randomPrivateKey();
    const pubBytes = secp256k1.getPublicKey(privBytes, /* compressed= */ true);
    return {
        publicKey: bytesToHex(pubBytes),
        privateKey: bytesToHex(privBytes),
    };
}
//# sourceMappingURL=keystore.js.map