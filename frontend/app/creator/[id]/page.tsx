"use client";

import { getCreatorById, getVideosByCreator, formatMON, formatAddress } from "@/lib/mockData";
import VideoCard from "@/components/VideoCard";
import InvestModal from "@/components/InvestModal";
import { Users, TrendingUp, Sparkles, AlertCircle, Share2, ShieldCheck, Wallet } from "lucide-react";
import { useState, use } from "react";
import { notFound } from "next/navigation";

export default function CreatorPage(props: { params: Promise<{ id: string }> }) {
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);
  
  const params = use(props.params);
  const creator = getCreatorById(params.id);
  
  if (!creator) return notFound();

  const creatorVideos = getVideosByCreator(creator.id);
  const progressPercent = Math.min(100, (creator.totalInvested / creator.investmentGoal) * 100);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Creator Header Section - AXIS Style */}
      <div className="neo-card flex flex-col md:flex-row mb-12 relative overflow-hidden bg-white border-4">
        {/* Profile Info */}
        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start relative z-10 w-full">
          <div className="w-40 h-40 bg-white border-4 border-black shadow-neo flex items-center justify-center text-8xl shrink-0">
            {creator.avatar}
          </div>
          
          <div className="flex flex-col flex-grow w-full">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter flex items-center gap-3">
                  {creator.name}
                  {creator.isVerified && <ShieldCheck className="text-[#FF4500]" size={40} />}
                </h1>
                <div className="flex items-center gap-3 mt-4 font-black uppercase text-sm bg-black text-white px-3 py-1.5 inline-flex shadow-neo-sm">
                  <span>@{creator.handle}</span>
                  <span className="text-[#FF4500]">/</span>
                  <span className="flex items-center gap-1">
                    <Wallet size={14} /> {formatAddress(creator.walletAddress)}
                  </span>
                </div>
              </div>

              <button className="neo-btn bg-white hover:bg-[#FF4500] hover:text-white p-3 border-4 shadow-neo transition-all">
                <Share2 size={24} />
              </button>
            </div>

            <p className="text-xl md:text-2xl font-black uppercase leading-tight max-w-3xl mb-8 border-l-8 border-[#FF4500] pl-6 py-2">
              {creator.bio}
            </p>

            <div className="flex flex-wrap gap-4">
              <span className="neo-badge bg-black text-white border-2 border-black px-4 py-2">
                CAT: {creator.category}
              </span>
              <span className="neo-badge bg-[#FF4500] text-black border-2 border-black px-4 py-2">
                {creatorVideos.length} RELEASES
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Content: Videos */}
        <div className="lg:col-span-2 space-y-10">
          <div className="border-b-4 border-black pb-4 mb-4">
            <h2 className="text-4xl font-black uppercase tracking-tighter">
              Latest <span className="text-[#FF4500]">Releases</span>
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8">
            {creatorVideos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
            {creatorVideos.length === 0 && (
              <div className="col-span-2 text-center p-20 border-4 border-dashed border-gray-400 font-black text-gray-500 uppercase">
                No content released yet
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Investment Info */}
        <div className="space-y-8">
          <div className="neo-card p-8 bg-[#FF4500] border-4 shadow-neo-xl relative overflow-hidden group">
            <Sparkles className="absolute -top-10 -right-10 text-black opacity-10" size={200} />
            
            <h3 className="text-3xl font-black uppercase mb-8 flex items-center gap-3 relative z-10 text-black">
              <TrendingUp size={32} /> INVEST POOL
            </h3>

            <div className="bg-white border-4 border-black p-6 mb-8 shadow-neo relative z-10">
              <p className="text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Total Position</p>
              <p className="text-4xl font-black text-black">{formatMON(creator.totalInvested)}</p>
              <div className="mt-6 mb-2">
                <div className="flex justify-between text-[10px] font-black mb-2 uppercase">
                  <span>GOAL: {formatMON(creator.investmentGoal)}</span>
                  <span>{progressPercent.toFixed(1)}%</span>
                </div>
                <div className="neo-progress-bar w-full h-5 border-3">
                  <div className="neo-progress-fill" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
              <div className="bg-white border-4 border-black p-4 flex flex-col items-center shadow-neo-sm">
                <Users size={24} className="mb-2" />
                <span className="font-black text-2xl">{creator.investorCount}</span>
                <span className="text-[10px] font-black uppercase text-gray-400">Backers</span>
              </div>
              <div className="bg-black text-white border-4 border-black p-4 flex flex-col items-center shadow-neo-sm">
                <TrendingUp size={24} className="mb-2 text-[#FF4500]" />
                <span className="font-black text-2xl text-[#FF4500]">+{creator.roi}%</span>
                <span className="text-[10px] font-black uppercase opacity-60">Avg. ROI</span>
              </div>
            </div>

            <button 
              onClick={() => setIsInvestModalOpen(true)}
              className="neo-btn bg-black text-white w-full justify-center text-2xl py-5 hover:bg-white hover:text-black border-4 transition-colors relative z-10"
            >
              INVEST NOW
            </button>
            
            <div className="mt-6 flex items-start gap-3 text-[10px] font-black uppercase leading-relaxed opacity-80 decoration-[#FF4500] underline underline-offset-4">
              <AlertCircle size={16} className="shrink-0" />
              <p>Stakeholders earn 10% of revenue settled on-chain via Monad.</p>
            </div>
          </div>
          
          <div className="neo-card p-8 bg-white border-4 shadow-neo">
             <h3 className="text-xl font-black uppercase mb-6 border-b-2 border-black pb-2 inline-block">Top Stakeholders</h3>
             <div className="space-y-4">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="flex justify-between items-center border-b-2 border-dashed border-gray-200 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-black text-white border-2 border-black flex items-center justify-center font-black text-xs">
                        {i}
                      </div>
                      <span className="font-mono text-sm font-black truncate w-24">0x{Math.random().toString(16).slice(2, 8)}</span>
                    </div>
                    <span className="font-black text-sm">
                      {(creator.totalInvested / (i * 2 + 1)).toFixed(2)} MON
                    </span>
                 </div>
               ))}
               <div className="text-center pt-4">
                 <button className="text-[10px] font-black uppercase hover:text-[#FF4500] transition-colors underline decoration-2">View On-Chain Explorer</button>
               </div>
             </div>
          </div>
        </div>
      </div>

      {isInvestModalOpen && (
        <InvestModal 
          creator={creator} 
          onClose={() => setIsInvestModalOpen(false)} 
        />
      )}
    </div>
  );
}
