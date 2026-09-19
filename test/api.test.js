/**
 * test/api.test.js
 *
 * Automated integration tests for Beggy Express HTTP endpoints.
 */
import { test, expect, afterAll } from 'bun:test';

process.env.PORT = '3099';
const { app, server } = await import('../index.js');
const { generateKeypair } = await import('../keystore.js');
const { secp256k1 } = await import('@noble/curves/secp256k1.js');
const { sha256 } = await import('@noble/hashes/sha2.js');
const { bytesToHex, hexToBytes } = await import('@noble/hashes/utils.js');

const BASE_URL = 'http://127.0.0.1:3099';

test('GET /api/health returns 200 and healthy metadata', async () => {
  const res = await fetch(`${BASE_URL}/api/health`);
  expect(res.status).toBe(200);
  const data = await res.json();
  expect(data.ok).toBe(true);
  expect(data.app).toContain('Beggy');
  expect(typeof data.blocks).toBe('number');
});

test('POST /api/keys/register returns valid secp256k1 keypair in dev', async () => {
  const res = await fetch(`${BASE_URL}/api/keys/register`, { method: 'POST' });
  expect(res.status).toBe(200);
  const data = await res.json();
  expect(data.publicKey).toBeDefined();
  expect(data.privateKey).toBeDefined();
  expect(data.privateKey.length).toBe(64);
  expect(data.publicKey.length).toBe(66);
});

test('POST /api/readings with valid signature persists block', async () => {
  const keys = generateKeypair();
  const readingData = JSON.stringify({ item: "Double Truffle Smashburger", saved: 19.70 });
  const hash = sha256(new TextEncoder().encode(readingData));
  const sigBytes = secp256k1.sign(hash, hexToBytes(keys.privateKey)).toCompactRawBytes();
  const sigHex = bytesToHex(sigBytes);

  const res = await fetch(`${BASE_URL}/api/readings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: readingData,
      signature: sigHex,
      publicKey: keys.publicKey
    })
  });

  expect(res.status).toBe(201);
  const body = await res.json();
  expect(body.ok).toBe(true);
  expect(body.block.idx).toBeGreaterThanOrEqual(0);
  expect(body.block.data).toBe(readingData);
});

test('POST /api/readings rejects invalid signature with 403', async () => {
  const keys = generateKeypair();
  const readingData = JSON.stringify({ item: "Counterfeit Reading" });
  const fakeSig = '0'.repeat(128);

  const res = await fetch(`${BASE_URL}/api/readings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: readingData,
      signature: fakeSig,
      publicKey: keys.publicKey
    })
  });

  expect(res.status).toBe(403);
  const body = await res.json();
  expect(body.ok).toBe(false);
});

test('GET /api/chain/latest?n=1 handles query limits safely without NaN', async () => {
  const res = await fetch(`${BASE_URL}/api/chain/latest?n=invalid`);
  expect(res.status).toBe(200);
  const blocks = await res.json();
  expect(Array.isArray(blocks)).toBe(true);
});

test('GET /api/chain/verify confirms chain integrity', async () => {
  const res = await fetch(`${BASE_URL}/api/chain/verify`);
  expect(res.status).toBe(200);
  const data = await res.json();
  expect(data.valid).toBe(true);
});

afterAll(() => {
  try {
    server.close();
  } catch {}
});
