# Beggy — Smart Food Delivery & Anti-Spending Dopamine Platform

> **"Craving takeout in Bengaluru? Experience the complete excitement of ordering from top local kitchens, track your delivery live on the map, and unlock real financial savings."**

🌐 **Live Demo (GitHub Pages)**: [https://arunachalamvenkatachalapathy-dev.github.io/beggy/](https://arunachalamvenkatachalapathy-dev.github.io/beggy/)

---

## 🌟 Highlights & Features

1. **Authentic 4-Stage Food Delivery Experience**
   - **Stage 1: Restaurant Discovery**: Explore 8 iconic Bengaluru kitchens across Indiranagar, Koramangala, and HSR Layout (Megha's Dum Darbar, Snuffles Burgers, Bengaluru Tiffin Room, Milano Woodfire Crusts, etc.).
   - **Stage 2: Rich Menu & Customization**: 28+ mouthwatering dishes across Biryani, Burgers, South Indian Tiffins, Pizza, Asian Bowls, and Desserts with dietary badges (Veg, Non-Veg, Must Try).
   - **Stage 3: Indian Payment Simulation**: Authentic UPI (Google Pay, PhonePe, Paytm), Net Banking (HDFC, SBI, ICICI, Axis), and COD with instant processing.
   - **Stage 4: Real-Time GPS Rider Tracking**: Dynamic Leaflet route map tracking rider "Manjunath K." navigating Koramangala / Indiranagar streets with animated scooter markers, live speed, distance, and 4-step milestones.

2. **The "Dopamine Hit Done — Real Save" Twist**
   - Upon rider arrival, the app celebrates with sound and confetti, revealing that your craving has been defeated!
   - **"Dopamine Hit Done — Let's Do Real Save"**: Automatically redirects the exact food bill directly into your simulated personal bank savings vault.
   - **Simulated Indian Bank SMS Toast**: Realistic SMS push notification (`🏦 BHARAT-BANK: A/C **4921 credited...`) with authentic bank chime sound synthesized via Web Audio API.
   - **Cook It at Home Link**: Direct link to Amazon Pantry / Fresh (`https://link.amazon/B05RiQ3Jy`) with curated ingredients and chef recipe instructions to cook the dish at home for a fraction of the cost.

3. **Passbook & Savings Ledger**
   - Interactive savings passbook tracking total lifetime savings, total orders resisted, and complete transaction history stored securely in `localStorage`.

4. **Cryptographic Blockchain Evidence Log (Backend)**
   - Tamper-evident ledger with **secp256k1** signature validation and **SHA-256** canonical JSON hashing.
   - Cross-runtime SQLite support (compatible with Bun and Node.js 22+).
   - Verify entire chain integrity from genesis via `/api/chain/verify`.

---

## 🚀 Quick Start

### Run Frontend Locally
Simply open `public/index.html` or `docs/index.html` directly in any modern web browser.

### Run with Backend Server (Node.js or Bun)
```bash
# Using Bun
bun install
bun run dev

# Or using Node.js (v22+)
npm install
npm start
```
The server will start at `http://localhost:3000`.

### Run Automated Tests
```bash
# Using Bun
bun test

# Or using Node.js
npm test
```

---

## 🛠️ Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health, block count, uptime, and environment |
| `POST` | `/api/readings` | Submit signed savings receipt / block to ledger |
| `GET` | `/api/chain` | Retrieve all verified blocks in chronological order |
| `GET` | `/api/chain/latest?n=10` | Retrieve the latest N blocks (default 10) |
| `GET` | `/api/chain/verify` | Recompute hashes & signatures from genesis |
| `POST` | `/api/keys/register` | Dev-only: Generate new secp256k1 keypair |

---

## 📁 Repository Structure

```
beggy/
├── .github/workflows/pages.yml # GitHub Actions auto-deployment to GitHub Pages
├── docs/                      # GitHub Pages static distribution
│   ├── index.html             # Multi-stage food delivery SPA
│   ├── style.css              # Swiggy design system styling & animations
│   ├── script.js              # State machine, GPS map, audio synth, and catalog
│   └── logo.jpg               # Official Beggy brand logo
├── public/                    # Express static directory (mirrored to docs/)
├── src/                       # TypeScript backend sources
│   ├── chain.ts               # Ledger validation, block appending & verify
│   ├── crypto.ts              # Deterministic JSON, SHA-256, secp256k1
│   ├── db.ts                  # Cross-runtime SQLite abstraction
│   ├── index.ts               # Express HTTP server & static fallback
│   └── keystore.ts            # Secp256k1 key generation helper
├── test/
│   ├── api.test.js            # Express endpoint integration tests
│   └── chain.test.js          # Cryptographic & SQLite unit tests
├── index.html                 # GitHub Pages root redirect fallback
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

---

## 📄 License
MIT © 2026 arunachalamvenkatachalapathy-dev
