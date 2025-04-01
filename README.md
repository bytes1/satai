# SatAI - Your AI Agent for sBTC

[DEMO VIDEO](https://youtu.be/Ho-SpZ3ks9g) <br> <br>

SatAI is an advanced AI agent designed to assist users with sBTC (Stacked Bitcoin) operations. You can connect your preferred wallet to SatAI, enabling seamless interaction with sBTC—just like chatting with a bot. Whether you need to transfer sBTC, check cryptocurrency prices, or analyze sBTC transactions, SatAI makes it effortless.

## Why SatAI?

In the crypto space, most users have a technical background or some level of blockchain knowledge. However, blockchain is a technology that has the potential to create a great impact on society, and it is already making strides in that direction. To truly unlock its potential, we need to make blockchain accessible to everyone, removing technical barriers and making it easy to use.

The first step toward this goal is ensuring that even non-technical users can onboard to blockchain seamlessly. Currently, SatAI depends on external wallets for interaction. For example, if a user wants to send 1 sBTC to another user, they can simply type a natural language command like:

> _Send 1 sBTC to this address._

SatAI will handle the entire transaction setup, preparing all the necessary details, and the user only needs to confirm the transaction. This makes interacting with sBTC as simple as chatting with a friend.

## Features

- **Wallet Connection** – Easily connect your preferred wallet to start interacting with sBTC.
- **sBTC Transfers** – Send and receive sBTC through a simple chat interface.
- **Crypto Price Lookup** – Get real-time price updates for various cryptocurrencies.
- **sBTC Analysis** – Perform transaction analysis and gain insights into your sBTC activity.
- **Bitcoin Layer Integration** – Direct interaction with Bitcoin liquidity via Stacks smart contracts.
- **Secure & Trustless** – Leverages Stacks' decentralized architecture for secure transactions.

## Technical Architecture

SatAI is built on a robust foundation that combines AI language models with blockchain technology:

- **AI Engine**: Powered by advanced language models to understand and process natural language inputs
- **Blockchain Interface**: Direct integration with Stacks blockchain and sBTC protocols
- **Wallet Connectors**: Support for multiple wallet providers including Hiro Wallet, Xverse, and others
- **API Layer**: Real-time data retrieval from cryptocurrency markets and blockchain explorers
- **Security Layer**: End-to-end encryption and zero knowledge of private keys

Currently, two API models are integrated into Satai: TogetherAI and Google Gemini. Initially, some issues were encountered while using TogetherAI, so Gemini was also integrated. However, Gemini has some rate limit issues.

Below is the roadmap outlining my planned integrations with SatAI.

- **Inbuilt Smart Wallet:** Transitioning beyond external wallet dependency by integrating a dedicated, user-friendly smart wallet directly within SatAI. This will significantly streamline the onboarding process for all users, especially those new to blockchain.
- **sBTC Application Hub:** Integrating multiple sBTC-related applications (DeFi protocols, marketplaces, etc.) directly into SatAI. Users will be able to interact with these external applications using natural language commands through SatAI, eliminating the need to switch between different interfaces.
- **DeFi Strategy Implementation:** Enabling users to discover, understand, and potentially execute various DeFi strategies involving sBTC directly via the SatAI interface.
- **Complete BTC-to-sBTC Conversion:** Fully implementing and simplifying the process for converting native Bitcoin (BTC) into sBTC within the agent, making it easier to bring Bitcoin liquidity onto the Stacks layer.
- **Expanded External Wallet Support:** Alongside the inbuilt wallet, we will continue to add support for a wider range of popular Stacks and Bitcoin wallets.
- **Advanced Analytics & Portfolio Management:** Introducing tools for deeper transaction insights, portfolio performance tracking, and yield opportunity identification.
- **Improved Natural Language Understanding:** Continuously refining the AI model to understand more complex queries and execute multi-step operations across integrated applications.
- **Mobile Accessibility:** Developing dedicated mobile applications for on-the-go access to SatAI.

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
