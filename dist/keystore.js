/**
 * src/keystore.ts
 *
 * Keypair generation utility (secp256k1).
 */
import { secp256k1 } from '@noble/curves/secp256k1.js';
import { bytesToHex } from '@noble/hashes/utils.js';
export function generateKeypair() {
    const privBytes = secp256k1.utils.randomPrivateKey();
    const pubBytes = secp256k1.getPublicKey(privBytes, /* compressed= */ true);
    return {
        publicKey: bytesToHex(pubBytes),
        privateKey: bytesToHex(privBytes),
    };
}
//# sourceMappingURL=keystore.js.map