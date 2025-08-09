# SatAI - Your AI Agent for sBTC & Stacks

[**DEMO VIDEO**](https://youtu.be/Ho-SpZ3ks9g)

SatAI is an advanced AI agent designed to simplify your interaction with the Stacks blockchain and the broader Bitcoin ecosystem. By connecting your wallet, you can perform a wide range of on-chain actions—from simple transfers to in-depth blockchain analysis—all through a natural, conversational chat interface.

## Why SatAI?

The world of crypto can be intimidating for newcomers. SatAI's mission is to break down these barriers. We believe that blockchain technology should be accessible to everyone, regardless of their technical background.

SatAI transforms complex blockchain operations into simple chat commands. Want to send crypto? Just type "Send 1 STX to this address." Curious about a transaction? Ask "Analyze this transaction hash for me." SatAI handles the technical details, so you only need to confirm the action. It's as easy as talking to a friend.

## Features

SatAI is more than just a wallet—it's a comprehensive toolkit for navigating the Stacks ecosystem.

- **Wallet Connection**: Securely connect your preferred Stacks wallet to get started.
- **Token Transfers**: Send sBTC and STX tokens using simple, natural language commands.
- **Crypto Price Data**: Get real-time and historical price data for various cryptocurrencies.
- **Token Balance Checker**: Instantly check the balance of all your fungible tokens.
- **NFT Gallery**: View all your Ordinal NFTs in a clean, visually appealing gallery.
- **Advanced Blockchain Explorer Tools**:
  - **Transaction Analysis**: Get a detailed breakdown of any transaction on the Stacks blockchain by providing its hash.
  - **Live Mempool Data**: See the current state of the network, including pending transactions and fee estimates.
  - **Smart Contract Inspector**: View the source code and inspect the data maps of any smart contract.

## How It Works in Practice

Using SatAI is designed to be intuitive and conversational.

1.  **Connect Your Wallet**: Link your Stacks-compatible wallet to authorize SatAI to prepare transactions on your behalf.
2.  **Chat with the AI**: Use plain English to ask questions and give commands.

**Examples:**

- **Check your assets**:
  > _"Show me my token balances."_ > _"Display my NFT gallery."_
- **Get market info**:
  > _"What's the current price of BTC?"_ > _"Show me the price history of STX for the last 30 days."_
- **Perform transactions**:
  > _"Send 0.5 sBTC to wallet address [address]."_
- **Analyze the blockchain**:
  > _"Analyze transaction hash [hash]."_ > _"What's the current mempool status?"_ > _"Show me the source code for the 'sbtc-token' contract at address [address]."_

## Technical Architecture

SatAI is built on a robust foundation that combines AI language models with blockchain technology:

- **AI Engine**: Powered by advanced language models to understand and process natural language inputs.
- **Blockchain Interface**: Direct integration with the **Hiro API** for comprehensive access to Stacks blockchain data, including transactions, smart contracts, NFTs, and more.
- **Wallet Connectors**: Support for multiple wallet providers.
- **API Layer**: Real-time data retrieval from cryptocurrency markets and blockchain explorers.
- **Security Layer**: End-to-end encryption and zero knowledge of private keys.

## Roadmap

- **Inbuilt Smart Wallet**: Integrating a dedicated, user-friendly smart wallet directly within SatAI.
- **sBTC Application Hub**: Integrating multiple sBTC-related applications (DeFi, marketplaces, etc.) directly into SatAI.
- **DeFi Strategy Implementation**: Enabling users to discover and execute DeFi strategies involving sBTC.
- **Advanced Analytics & Portfolio Management**: Introducing tools for deeper transaction insights and portfolio performance tracking.

## Getting Started

### Prerequisites

- Node.js (latest recommended version)
- pnpm or npm
- Stacks Wallet

### Installation

```sh
pnpm install  # or npm install
```

### Running the Project

```sh
pnpm run dev  # or npm run dev
```
