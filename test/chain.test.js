/**
 * test/chain.test.js
 *
 * Automated unit tests for Beggy Evidence Log & Cryptography.
 */
import { test, expect } from 'bun:test';
import { canonicalize, hashBlock, verifySignature } from '../crypto.js';
import { initDb, appendBlock, getAllBlocks, getBlockCount, closeDb, tamperBlockData } from '../db.js';
import { submitReading, verifyEntireChain } from '../chain.js';
import { generateKeypair } from '../keystore.js';
import { secp256k1 } from '@noble/curves/secp256k1.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils.js';

test('1. canonicalize sorts object keys recursively', () => {
  const obj1 = { b: 2, a: 1, c: { z: 10, y: 20 } };
  const obj2 = { c: { y: 20, z: 10 }, a: 1, b: 2 };
  expect(canonicalize(obj1)).toBe(canonicalize(obj2));
  expect(canonicalize(obj1)).toBe('{"a":1,"b":2,"c":{"y":20,"z":10}}');
});

test('2. keypair generation produces valid 64/66 hex keys', () => {
  const keys = generateKeypair();
  expect(keys.publicKey).toBeDefined();
  expect(keys.privateKey).toBeDefined();
  expect(keys.privateKey.length).toBe(64);
  expect(keys.publicKey.length).toBe(66);
});

test('3. signature generation and verification works with secp256k1', () => {
  const keys = generateKeypair();
  const data = JSON.stringify({ item: "Double Truffle Smashburger", saved: 19.70 });
  const msgHash = sha256(new TextEncoder().encode(data));
  const sig = secp256k1.sign(msgHash, hexToBytes(keys.privateKey));
  const sigHex = bytesToHex(sig.toCompactRawBytes());

  const isValid = verifySignature(data, sigHex, keys.publicKey);
  expect(isValid).toBe(true);

  // Tampered data should fail verification
  const isInvalid = verifySignature(data + "tampered", sigHex, keys.publicKey);
  expect(isInvalid).toBe(false);
});

test('4. database in-memory isolation and block operations', () => {
  initDb(':memory:');
  expect(getBlockCount()).toBe(0);

  const keys = generateKeypair();
  const reading = JSON.stringify({ event: "dopamine_savings_deposit", amount: 28.50 });
  const msgHash = sha256(new TextEncoder().encode(reading));
  const sigHex = bytesToHex(secp256k1.sign(msgHash, hexToBytes(keys.privateKey)).toCompactRawBytes());

  const block0 = submitReading({
    data: reading,
    signature: sigHex,
    publicKey: keys.publicKey
  });

  expect(block0.idx).toBe(0);
  expect(block0.previousHash).toBe('0'.repeat(64));
  expect(getBlockCount()).toBe(1);

  const verification = verifyEntireChain();
  expect(verification.valid).toBe(true);
  expect(verification.brokenAtIndex).toBeNull();
  expect(verification.blocks.length).toBe(1);

  closeDb();
});

test('5. tamper detection catches direct DB modifications', () => {
  initDb(':memory:');
  const keys = generateKeypair();
  const data = JSON.stringify({ saved: 50.00 });
  const msgHash = sha256(new TextEncoder().encode(data));
  const sigHex = bytesToHex(secp256k1.sign(msgHash, hexToBytes(keys.privateKey)).toCompactRawBytes());

  submitReading({ data, signature: sigHex, publicKey: keys.publicKey });

  // Tamper directly in SQLite
  tamperBlockData(0, JSON.stringify({ saved: 9999.00 }));

  const verification = verifyEntireChain();
  expect(verification.valid).toBe(false);
  expect(verification.brokenAtIndex).toBe(0);

  closeDb();
});
