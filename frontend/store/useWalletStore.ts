"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_TRANSACTIONS, Transaction } from "@/lib/mockData";

interface Investment {
  creatorId: string;
  creatorName: string;
  amount: number;
  returns: number;
  timestamp: number;
  roi: number;
}

interface WatchedVideo {
  videoId: string;
  title: string;
  creatorId: string;
  paidAmount: number;
  timestamp: number;
}

interface WalletState {
  // Connection
  address: `0x${string}` | null;
  isConnected: boolean;
  balance: number; // in MON

  // Activity
  watchedVideos: WatchedVideo[];
  investments: Investment[];
  transactions: Transaction[];

  // Earnings (for creator mode)
  creatorEarnings: number;
  totalSpent: number;
  totalInvested: number;
  totalReturns: number;

  // Actions
  setAddress: (addr: `0x${string}` | null) => void;
  setConnected: (v: boolean) => void;
  setBalance: (b: number) => void;
  addWatchedVideo: (v: WatchedVideo) => void;
  addInvestment: (inv: Investment) => void;
  addTransaction: (tx: Transaction) => void;
  addReturn: (creatorId: string, amount: number) => void;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      address: null,
      isConnected: false,
      balance: 1.0, // mock starting balance
      watchedVideos: [],
      investments: [],
      transactions: MOCK_TRANSACTIONS,
      creatorEarnings: 0,
      totalSpent: 0,
      totalInvested: 0,
      totalReturns: 0.0012,

      setAddress: (addr) => set({ address: addr }),
      setConnected: (v) => set({ isConnected: v }),
      setBalance: (b) => set({ balance: b }),

      addWatchedVideo: (v) =>
        set((s) => ({
          watchedVideos: [v, ...s.watchedVideos],
          balance: Math.max(0, s.balance - v.paidAmount),
          totalSpent: s.totalSpent + v.paidAmount,
        })),

      addInvestment: (inv) =>
        set((s) => ({
          investments: [inv, ...s.investments],
          balance: Math.max(0, s.balance - inv.amount),
          totalInvested: s.totalInvested + inv.amount,
        })),

      addTransaction: (tx) =>
        set((s) => ({
          transactions: [tx, ...s.transactions],
        })),

      addReturn: (creatorId, amount) =>
        set((s) => ({
          totalReturns: s.totalReturns + amount,
          investments: s.investments.map((inv) =>
            inv.creatorId === creatorId
              ? {
                  ...inv,
                  returns: inv.returns + amount,
                  roi: ((inv.returns + amount) / inv.amount) * 100,
                }
              : inv
          ),
        })),

      disconnect: () =>
        set({
          address: null,
          isConnected: false,
          balance: 1.0,
          watchedVideos: [],
          investments: [],
          transactions: MOCK_TRANSACTIONS,
          totalSpent: 0,
          totalInvested: 0,
          totalReturns: 0.0012,
        }),
    }),
    {
      name: "streampay-wallet",
    }
  )
);
