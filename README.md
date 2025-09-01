# SatAI – Your AI Agent for sBTC & Stacks

[**DEMO VIDEO**](https://www.loom.com/share/520850bbbf2c49f0ae8b636f1dd02efe)

SatAI is an advanced AI agent designed to simplify your interaction with the Stacks blockchain and the broader Bitcoin ecosystem. By connecting your wallet, you can perform a wide range of on-chain actions—from simple transfers to in-depth blockchain analysis—all through a natural, conversational chat interface.

---

## ✨ Features

SatAI is more than just a wallet—it's a conversational toolkit for the Stacks + sBTC ecosystem.

### 🪙 Core Wallet Features

- **Wallet Connection** – securely connect your Stacks-compatible wallet.
- **Token Transfers** – send STX and sBTC with natural commands.
- **Token Balance Checker** – check balances of all your fungible tokens.
- **NFT Gallery** – display Ordinal NFTs and collectibles in a clean gallery.

### 📊 Market Insights

- **Crypto Price Data** – fetch real-time and historical data.
- **Coin Metadata** – get token name, symbol, description, and image via contract address.

### 🔍 Blockchain Explorer Tools

- **Transaction Analysis** – detailed breakdown of any transaction hash (status, fees, events).
- **Recent Activity** – pull the latest transactions on the Stacks network.
- **Mempool Data** – view pending transactions and fee estimates.
- **Smart Contract Source Code Viewer** – fetch and inspect contract source code.
- **Smart Contract ABI Viewer** – see all functions, variables, and maps in a readable format.

---

## 💡 How It Works

1. **Connect Your Wallet** – authorize SatAI to prepare transactions on your behalf.
2. **Chat with the AI** – use plain English commands.

**Examples:**

- _"Send 1 STX to \[address]"_
- _"Analyze transaction hash \[hash]"_
- _"Show me the source code for the sbtc-token contract"_
- _"Display my NFT gallery of \[address]"_
- _"What's the ABI for \[contract address] \[contract name]?"_

---

## ⚙️ Technical Architecture

- **AI Engine** – natural language processing via Google Generative AI.
- **Blockchain Data** – powered by **Hiro API** for transactions, mempool, contracts, and NFTs.
- **Market Data** – fetched via **CoinMarketCap** and **CoinGecko** APIs.
- **Wallet Integration** – support for Stacks wallets via Wallet Connectors.
- **Security Layer** – end-to-end encryption with zero access to private keys.

---

## 🔑 Environment Variables

Create a `.env` file in the project root and add the following:

```ini
GOOGLE_GENERATIVE_AI_API_KEY=your_google_genai_api_key
HIRO_API_KEY=your_hiro_api_key
COINMARKETCAP_API_KEY=your_coinmarketcap_api_key
COINGECKO_API_KEY=your_coingecko_api_key
```

- `GOOGLE_GENERATIVE_AI_API_KEY` → For processing natural language chat commands.
- `HIRO_API_KEY` → For accessing Stacks blockchain data.
- `COINMARKETCAP_API_KEY` → For fetching crypto market data.
- `COINGECKO_API_KEY` → Alternative source for price and token metadata.

---

## 🛠️ Installation

### Prerequisites

- Node.js (latest LTS recommended)
- pnpm or npm
- Stacks Wallet

### Steps

```sh
# Clone the repo
git clone https://github.com/your-org/satai.git
cd satai

# Install dependencies
pnpm install

# Start development
pnpm dev

# Build for production
pnpm build
```

---

## 🚀 Roadmap

- **Built-in Smart Wallet** – a native SatAI wallet.
- **sBTC Application Hub** – integrate DeFi apps, marketplaces, and more.
- **DeFi Strategy Engine** – discover and execute yield strategies.
- **Portfolio Analytics** – deeper insights and performance tracking.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

- Fork the repo
- Create a branch (`git checkout -b feature/amazing-feature`)
- Commit changes (`git commit -m 'Add amazing feature'`)
- Push (`git push origin feature/amazing-feature`)
- Open a PR

---
