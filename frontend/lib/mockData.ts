// Mock data for StreamPay — hackathon demo
// All creators and videos have realistic mock data for demo purposes

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;          // emoji avatar
  bio: string;
  walletAddress: `0x${string}`;
  totalEarnings: number;   // in MON (mock)
  investorCount: number;
  totalInvested: number;   // in MON
  investmentGoal: number;  // in MON
  category: string;
  isVerified: boolean;
  roi: number;             // % ROI for investors
  color: string;           // card accent color
}

export interface Video {
  id: string;
  title: string;
  creatorId: string;
  thumbnail: string;
  duration: string;
  pricePerView: number;    // in MON
  views: number;
  description: string;
  tags: string[];
  embedUrl?: string;
  isLive?: boolean;
}

export interface Notification {
  id: string;
  type: "yield" | "follow" | "unlock";
  message: string;
  timestamp: Date;
  amount?: number;
}

export interface Transaction {
  id: string;
  type: "payment" | "investment" | "earning" | "withdrawal";
  from: string;
  to: string;
  amount: number;
  timestamp: number;
  videoId?: string;
  txHash: string;
}

// ── Creators ──────────────────────────────────────────────────
export const CREATORS: Creator[] = [
  {
    id: "creator-1",
    name: "Alex Rivera",
    handle: "ALEXRIVERA",
    avatar: "🎬",
    bio: "Web3 filmmaker documenting the decentralized revolution. 200K+ subscribers across platforms.",
    walletAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    totalEarnings: 142.5,
    investorCount: 24,
    totalInvested: 18.4,
    investmentGoal: 50,
    category: "Film",
    isVerified: true,
    roi: 23.4,
    color: "#FF4500",
  },
  {
    id: "creator-2",
    name: "Zara Chen",
    handle: "ZARACHEN",
    avatar: "🎵",
    bio: "Independent music artist. Building the future of music ownership on-chain.",
    walletAddress: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
    totalEarnings: 89.2,
    investorCount: 15,
    totalInvested: 11.6,
    investmentGoal: 30,
    category: "Music",
    isVerified: true,
    roi: 18.7,
    color: "#FF4500",
  },
  {
    id: "creator-3",
    name: "Marcus Webb",
    handle: "MARCUSWEBB",
    avatar: "💻",
    bio: "DeFi educator. Breaking down complex blockchain concepts for the masses.",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    totalEarnings: 210.8,
    investorCount: 41,
    totalInvested: 32.1,
    investmentGoal: 80,
    category: "Education",
    isVerified: true,
    roi: 31.2,
    color: "#FF4500",
  },
  {
    id: "creator-4",
    name: "Luna Park",
    handle: "LUNAPARK",
    avatar: "🎨",
    bio: "Generative artist pushing the limits of digital creation on-chain.",
    walletAddress: "0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836",
    totalEarnings: 67.3,
    investorCount: 9,
    totalInvested: 7.8,
    investmentGoal: 25,
    category: "Art",
    isVerified: false,
    roi: 12.1,
    color: "#FF4500",
  },
];

// ── Videos ─────────────────────────────────────────────────────
export const VIDEOS: Video[] = [
  {
    id: "video-1",
    title: "The Future of Web3 Content Creation",
    creatorId: "creator-1",
    thumbnail: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=640&q=80",
    duration: "12:34",
    pricePerView: 0.01,
    views: 4821,
    description: "Deep dive into how blockchain is reshaping content creation and monetization.",
    tags: ["Web3", "Content", "Blockchain"],
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isLive: true,
  },
  {
    id: "video-2",
    title: "Making Music in the Age of NFTs",
    creatorId: "creator-2",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=640&q=80",
    duration: "08:22",
    pricePerView: 0.005,
    views: 2340,
    description: "How independent artists are using NFTs to monetize directly with fans.",
    tags: ["Music", "NFT", "Artist"],
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isLive: true,
  },
  {
    id: "video-3",
    title: "DeFi Explained in 10 Minutes",
    creatorId: "creator-3",
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=640&q=80",
    duration: "10:01",
    pricePerView: 0.008,
    views: 12500,
    description: "The simplest explanation of decentralized finance you'll ever watch.",
    tags: ["DeFi", "Education", "Crypto"],
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "video-4",
    title: "Generative Art: My Process Revealed",
    creatorId: "creator-4",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=640&q=80",
    duration: "15:48",
    pricePerView: 0.007,
    views: 1890,
    description: "Behind the scenes of creating generative NFT art collections.",
    tags: ["Art", "Generative", "NFT"],
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "video-5",
    title: "My First Week Earning on Monad",
    creatorId: "creator-1",
    thumbnail: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=640&q=80",
    duration: "06:15",
    pricePerView: 0.012,
    views: 3200,
    description: "Real numbers from my first week monetizing on Monad testnet.",
    tags: ["Monad", "Earnings", "Creator"],
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "video-6",
    title: "Investing in Creators: Is It Worth It?",
    creatorId: "creator-3",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=640&q=80",
    duration: "09:33",
    pricePerView: 0.01,
    views: 5670,
    description: "Breaking down the ROI of investing in creators on StreamPay.",
    tags: ["Investment", "ROI", "DeFi"],
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

// ── Mock Transactions ──────────────────────────────────────────
export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    type: "payment",
    from: "0xYou",
    to: "creator-1",
    amount: 0.01,
    timestamp: Date.now() - 120000,
    videoId: "video-1",
    txHash: "0xabc123...def456",
  },
  {
    id: "tx-2",
    type: "investment",
    from: "0xYou",
    to: "creator-3",
    amount: 0.05,
    timestamp: Date.now() - 300000,
    txHash: "0x789abc...012def",
  },
  {
    id: "tx-3",
    type: "earning",
    from: "creator-3",
    to: "0xYou",
    amount: 0.0012,
    timestamp: Date.now() - 60000,
    txHash: "0x456xyz...789abc",
  },
];

// ── Helpers ────────────────────────────────────────────────────
export const getCreatorById = (id: string) =>
  CREATORS.find((c) => c.id === id);

export const getVideosByCreator = (creatorId: string) =>
  VIDEOS.filter((v) => v.creatorId === creatorId);

export const getVideoById = (id: string) =>
  VIDEOS.find((v) => v.id === id);

export const formatMON = (val: number) =>
  `${val.toFixed(4)} MON`;

export const formatAddress = (addr: string) =>
  addr.length > 10 ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : addr;

// ── Mock Notifications ─────────────────────────────────────────
export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    type: "yield",
    message: "HODL SUCCESS: YOU CLAIMED 0.42 MON FROM @ALEXRIVERA POOL",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    amount: 0.42,
  },
  {
    id: "notif-2",
    type: "unlock",
    message: "@ZARACHEN UNLOCKED YOUR EXCLUSIVE BEHIND-THE-SCENES",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "notif-3",
    type: "follow",
    message: "NEW STAKEHOLDER: @MARCUSWEBB JOINED YOUR CREATOR POOL",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
];
