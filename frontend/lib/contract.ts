// StreamPay Contract ABI and helpers
// Replace CONTRACT_ADDRESS after deploying via: cd contracts && npx hardhat run scripts/deploy.js --network monadTestnet

export const CONTRACT_ADDRESS =
  (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`) ||
  "0x0687896Ba0deeFf268E9B33dF106ef7328C903C0";

export const STREAM_PAY_ABI = [
  // ── State variables ──────────────────────────────────────
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "creatorBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalInvestedInCreator",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  // ── Core functions ───────────────────────────────────────
  {
    inputs: [{ internalType: "address", name: "creator", type: "address" }],
    name: "payCreator",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "creator", type: "address" }],
    name: "investInCreator",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawCreatorEarnings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "creator", type: "address" }],
    name: "withdrawInvestorEarnings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  // ── View functions ───────────────────────────────────────
  {
    inputs: [{ internalType: "address", name: "creator", type: "address" }],
    name: "getCreatorInvestmentPool",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "creator", type: "address" },
      { internalType: "address", name: "investor", type: "address" },
    ],
    name: "getInvestorStake",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "creator", type: "address" },
      { internalType: "address", name: "investor", type: "address" },
    ],
    name: "getInvestorEarnings",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "creator", type: "address" }],
    name: "getInvestorCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "creator", type: "address" },
      { internalType: "address", name: "investor", type: "address" },
    ],
    name: "getInvestorShare",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalPlatformEarnings",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  // ── Events ──────────────────────────────────────────────
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "viewer", type: "address" },
      { indexed: true, internalType: "address", name: "creator", type: "address" },
      { indexed: false, internalType: "uint256", name: "totalAmount", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "creatorAmount", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "investorPoolAmount", type: "uint256" },
    ],
    name: "PaymentMade",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "investor", type: "address" },
      { indexed: true, internalType: "address", name: "creator", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "InvestmentMade",
    type: "event",
  },
] as const;
