"use client";

import { Video, formatMON } from "@/lib/mockData";
import { useWalletStore } from "@/store/useWalletStore";
import { Lock, Play, Volume2, Maximize, Loader2 } from "lucide-react";
import { useState } from "react";
import { parseEther } from "viem";
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useSwitchChain } from "wagmi";
import { CONTRACT_ADDRESS, STREAM_PAY_ABI } from "@/lib/contract";
import { MONAD_CHAIN_ID } from "@/lib/monad";

interface VideoPlayerProps {
  video: Video;
  creatorAddress: `0x${string}`;
}

export default function VideoPlayer({ video, creatorAddress }: VideoPlayerProps) {
  const { isConnected, watchedVideos, addWatchedVideo } = useWalletStore();
  const [isUnlockedLocal, setIsUnlockedLocal] = useState(false);

  // Check if user has already paid for this video
  const isPaid = watchedVideos.some((v) => v.videoId === video.id) || isUnlockedLocal;

  const { chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { writeContract, data: hash, isPending: isWriting, error: writeError } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handlePay = async () => {
    if (!isConnected) return alert("Please connect wallet first");

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
        functionName: "payCreator",
        args: [creatorAddress],
        value: parseEther(video.pricePerView.toString()),
        chainId: MONAD_CHAIN_ID,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Effect to update local unlock state and global store once confirmed
  if (isConfirmed && !isUnlockedLocal) {
    setIsUnlockedLocal(true);
    addWatchedVideo({
      videoId: video.id,
      title: video.title,
      creatorId: video.creatorId,
      paidAmount: video.pricePerView,
      timestamp: Date.now(),
    });
  }

  const isLoading = isWriting || isConfirming;

  if (isPaid) {
    return (
      <div className="neo-card p-0 bg-black aspect-video relative overflow-hidden group border-4">
        {video.embedUrl ? (
          <iframe 
            src={`${video.embedUrl}?autoplay=1&mute=0&rel=0&modestbranding=1`} 
            className="w-full h-full border-none absolute inset-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center relative">
            <img src={video.thumbnail} className="absolute inset-0 opacity-40 object-cover" />
            <Play size={80} className="text-[#FF4500] fill-current z-10 cursor-pointer hover:scale-110 transition-transform" />
          </div>
        )}

        {/* AXIS Style Control Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t-3 border-black p-3 flex flex-col gap-2 z-20">
          <div className="neo-progress-bar w-full h-2">
             <div className="neo-progress-fill w-1/3" />
          </div>
          <div className="flex items-center justify-between text-black font-black uppercase text-xs">
            <div className="flex items-center gap-4">
              <Play size={18} className="fill-current" />
              <Volume2 size={18} />
              <span className="font-mono">04:32 / {video.duration}</span>
            </div>
            <div className="flex items-center gap-4">
               <span className="bg-[#FF4500] text-black px-2 py-0.5 border-2 border-black">LIVE</span>
               <Maximize size={18} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="neo-card flex flex-col items-center justify-center bg-[#BBB] aspect-video relative overflow-hidden border-4">
      {/* Background Grayscale */}
      <img
        src={video.thumbnail}
        alt="Locked content"
        className="absolute inset-0 w-full h-full object-cover filter grayscale opacity-40 z-0"
      />

      {/* Paywall Card - AXIS Style */}
      <div className="z-10 flex flex-col items-center text-center p-8 border-4 border-black bg-white shadow-neo max-w-sm w-full mx-4">
        <div className="bg-black text-white p-3 border-3 border-black -mt-14 mb-4 shadow-neo">
          <Lock size={32} />
        </div>
        
        <h2 className="text-2xl font-black mb-1 uppercase leading-tight">{video.title}</h2>
        <p className="text-gray-500 text-xs mb-6 font-black uppercase tracking-widest">Premium Content • Monad Testnet</p>

        {writeError && (
          <div className="w-full mb-4 p-2 bg-red-100 border-2 border-red-500 text-red-700 text-[10px] font-mono break-words text-left">
            {(writeError as any).shortMessage || "Payment failed"}
          </div>
        )}

        <button
          onClick={handlePay}
          disabled={isLoading}
          className="neo-btn neo-btn-orange w-full text-lg justify-center py-4 border-4"
        >
          {isLoading ? (
            <Loader2 size={24} className="animate-spin" />
          ) : (
            `INVEST IN WATCHING • ${formatMON(video.pricePerView)}`
          )}
        </button>
      </div>
    </div>
  );
}
