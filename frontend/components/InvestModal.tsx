"use client";

import { Creator, formatMON } from "@/lib/mockData";
import { useWalletStore } from "@/store/useWalletStore";
import { X, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { parseEther } from "viem";
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useSwitchChain } from "wagmi";
import { CONTRACT_ADDRESS, STREAM_PAY_ABI } from "@/lib/contract";
import { MONAD_CHAIN_ID } from "@/lib/monad";

interface InvestModalProps {
  creator: Creator;
  onClose: () => void;
}

export default function InvestModal({ creator, onClose }: InvestModalProps) {
  const { isConnected, addInvestment } = useWalletStore();
  const [amount, setAmount] = useState<string>("0.1");
  const [isSuccess, setIsSuccess] = useState(false);

  const { chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  const { writeContract, data: hash, isPending: isWriting, error: writeError } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleInvest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !amount || isNaN(Number(amount)) || Number(amount) <= 0) return;

    if (chainId !== MONAD_CHAIN_ID && switchChainAsync) {
      try {
        await switchChainAsync({ chainId: MONAD_CHAIN_ID });
      } catch (e) {
        return; // User cancelled network switch
      }
    }

    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: STREAM_PAY_ABI,
        functionName: "investInCreator",
        args: [creator.walletAddress],
        value: parseEther(amount),
        chainId: MONAD_CHAIN_ID,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Mock successful local state update when transaction confirms
  if (isConfirmed && !isSuccess) {
    setIsSuccess(true);
    addInvestment({
      creatorId: creator.id,
      creatorName: creator.name,
      amount: Number(amount),
      returns: 0,
      timestamp: Date.now(),
      roi: 0
    });
    
    // Auto-close after 3 seconds
    setTimeout(() => {
      onClose();
    }, 3000);
  }

  const isLoading = isWriting || isConfirming;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={!isLoading ? onClose : undefined} 
      />

      {/* Modal Content */}
      <div className="neo-card relative w-full max-w-md bg-white z-10 animate-float" style={{ animation: 'bounce-x 0.3s ease' }}>
        {/* Header */}
        <div className="border-b-3 border-black p-4 flex items-center justify-between" style={{ backgroundColor: creator.color }}>
          <h2 className="font-black text-xl flex items-center gap-2" style={{ color: creator.color === '#000000' || creator.color === '#FF3333' ? 'white' : 'black' }}>
            <Sparkles size={20} />
            Invest in {creator.name}
          </h2>
          <button 
            onClick={onClose} 
            disabled={isLoading}
            className="p-1 hover:bg-black/20 rounded transition-colors disabled:opacity-50"
          >
            <X size={24} style={{ color: creator.color === '#000000' || creator.color === '#FF3333' ? 'white' : 'black' }} />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-3 border-black bg-yellow-400 flex items-center justify-center mb-4">
              <Sparkles size={32} className="text-black" />
            </div>
            <h3 className="font-black text-2xl mb-2">Investment Blocked!</h3>
            <p className="text-gray-600 mb-6 font-mono text-sm">
              Wait, no, it succeeded! Welcome to the {creator.name} investor pool.
            </p>
            <p className="text-xs text-gray-500 max-w-[80%] mx-auto">
              You will automatically earn a share of their future revenue.
            </p>
          </div>
        ) : (
          <form onSubmit={handleInvest} className="p-6">
            <div className="mb-6">
              <label htmlFor="amount" className="block font-bold text-sm mb-2 uppercase tracking-wide flex justify-between">
                <span>Investment Amount (MON)</span>
                <span className={Number(amount) > (creator.totalInvested * 0.01 / 0.99) ? "text-red font-black" : "text-blue font-black"}>
                  Stake: {amount && !isNaN(Number(amount)) ? ((Number(amount) / (creator.totalInvested + Number(amount))) * 100).toFixed(2) : "0.00"}%
                </span>
              </label>
              <div className="relative">
                <input
                  id="amount"
                  type="number"
                  step="0.001"
                  min="0.001"
                  max={(creator.totalInvested * 0.01 / 0.99).toFixed(3)}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isLoading || !isConnected}
                  className="neo-input text-lg pr-16"
                  placeholder="0.1"
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 font-black text-gray-400">
                  MON
                </div>
              </div>
              <div className="flex justify-between items-start mt-2">
                <p className="text-xs text-gray-500 font-mono">
                  Est. ROI based on historical performance: <span className="text-blue font-bold">+{creator.roi}%</span>
                </p>
                <p className="text-xs font-bold text-red-500 font-mono text-right max-w-[50%]">
                  Max stake limit per user: 1.00%
                </p>
              </div>
            </div>

            {writeError && (
              <div className="mb-4 p-3 bg-red-100 border-2 border-red-500 text-red-700 text-xs font-mono break-words">
                {writeError.message.includes("Cannot invest in yourself") 
                  ? "Error: You cannot invest in your own creator profile."
                  : (writeError as any).shortMessage || "Transaction failed or rejected."}
              </div>
            )}

            {!isConnected ? (
              <div className="p-4 border-3 border-dashed border-gray-300 text-center bg-gray-50 mb-6 text-sm text-gray-500 font-bold">
                Please connect your wallet first.
              </div>
            ) : (
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="neo-btn bg-white hover:bg-gray-100 flex-1 justify-center disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !amount || Number(amount) <= 0}
                  className="neo-btn bg-black text-white hover:bg-gray-800 flex-[2] justify-center disabled:opacity-50"
                  style={{ backgroundColor: creator.color, color: creator.color === '#000000' || creator.color === '#FF3333' ? 'white' : 'black' }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {isWriting ? "Confirming..." : "Processing Tx..."}
                    </>
                  ) : (
                    <>
                      Confirm <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
