# StreamPay — Real-Time Creator Monetization on Monad

StreamPay is a Web3-based content platform built on the Monad testnet where users can watch videos and pay creators in real-time using microtransactions. StreamPay also introduces a **creator investment model**, allowing users to invest in a creator's pool and earn a permanent percentage of their future revenue.

Built with **Next.js**, **Tailwind CSS (Neobrutalism Design)**, **Wagmi/Viem**, and **Solidity**.

## ✨ Features

- **Pay-Per-View Video Feed**: No ads, no subscriptions. Pay a fraction of a MON via smart contract to instantly unlock a video.
- **Microtransactions on Monad**: Lightning-fast, near-zero cost payments settled instantly to the creator on the Monad testnet.
- **Creator Investment Pool**: Invest MON in a creator's pool to secure a share of their future earnings (e.g., a 10% pool split amongst investors).
- **Investor Dashboard**: Track your investments, view live ROIs, and see how much your creator portfolio is generating.
- **Neobrutalist UI**: Bold, high-contrast user interface with thick borders, sharp shadows, and playful interactions.

## 🛠 Project Structure

The project contains two main workspaces:
- `/contracts`: Hardhat project containing the `StreamPay.sol` smart contract and deployment scripts.
- `/frontend`: Next.js 14 App Router application containing the Web3 frontend.

## 🚀 Quick Start

### 1. Smart Contracts Setup

```bash
cd contracts
npm install

# Compile the contract
npx hardhat compile

# Deploy to Monad testnet
npx hardhat run scripts/deploy.js --network monadTestnet
```

*Note: Make sure to copy the `.env.example` to `.env` and add your wallet's `PRIVATE_KEY` with some testnet MON.*

### 2. Frontend Setup

```bash
cd frontend
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the complete flow.

**Make sure you configure MetaMask for the Monad Testnet:**
- **Network Name**: Monad Testnet
- **RPC URL**: https://testnet-rpc.monad.xyz
- **Chain ID**: 10143
- **Currency Symbol**: MON
- **Block Explorer**: https://testnet.monadexplorer.com

You can get testnet MON from the [Monad Faucet](https://faucet.monad.xyz).

## 💡 Demo Flow
1. Open the landing page.
2. Click **Connect Wallet** (switches to Monad Testnet automatically via Wagmi).
3. Browse the **Video Feed**.
4. Click on a video and hit **Unlock • 0.01 MON**.
5. Approve the low-fee transaction in your wallet. The video instantly unlocks.
6. Click the creator's avatar to go to their **Profile**.
7. Click **Invest Now** to deposit MON into their investment pool.
8. Go to your **Dashboard** -> **Investor** tab to see your portfolio and ROI.

## 🔗 Architecture Notes
For hackathon simplicity and UX flow:
- Video metadata is mocked in `frontend/lib/mockData.ts`.
- The smart contract `StreamPay.sol` implements the `payCreator` (90% creator / 10% investor split) and `investInCreator` functions.
- Local state (zustand) handles instant local UI updates while transaction receipts are confirmed on-chain via Wagmi.
