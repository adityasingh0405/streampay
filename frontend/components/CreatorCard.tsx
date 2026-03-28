"use client";

import { Creator, formatMON } from "@/lib/mockData";
import { Users, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import InvestModal from "./InvestModal";
import { useState } from "react";

interface CreatorCardProps {
  creator: Creator;
}

export default function CreatorCard({ creator }: CreatorCardProps) {
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);
  
  // Calculate funding progress
  const progressPercent = Math.min(100, (creator.totalInvested / creator.investmentGoal) * 100);

  return (
    <div className="neo-card flex flex-col h-full bg-white relative transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Top Banner Accent */}
      <div className="h-20 w-full border-b-3 border-black" style={{ backgroundColor: creator.color }}></div>
      
      {/* Avatar (overlapping banner) */}
      <div className="px-5 absolute top-8">
        <div className="w-20 h-20 bg-white border-3 border-black rounded-none shadow-neo flex items-center justify-center text-4xl">
          {creator.avatar}
        </div>
      </div>

      <div className="px-5 pt-12 pb-5 flex flex-col flex-grow">
        {/* Name and Handle */}
        <div className="mb-3">
          <Link href={`/creator/${creator.id}`} className="group flex items-center gap-1">
            <h3 className="font-bold text-xl group-hover:text-blue transition-colors">
              {creator.name}
            </h3>
            {creator.isVerified && <CheckCircle2 size={16} className="text-blue fill-white" />}
          </Link>
          <span className="text-gray-500 font-mono text-sm">{creator.handle}</span>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {creator.bio}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5 mt-auto">
          <div className="border-2 border-black p-2 bg-neo-gray flex flex-col">
            <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
              <Users size={12} /> Investors
            </span>
            <span className="font-black text-lg">{creator.investorCount}</span>
          </div>
          <div className="border-2 border-black p-2 bg-yellow-400 bg-opacity-30 flex flex-col">
            <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
              <TrendingUp size={12} /> Est. ROI
            </span>
            <span className="font-black text-lg text-blue">+{creator.roi}%</span>
          </div>
        </div>

        {/* Funding Bar */}
        <div className="mb-5">
          <div className="flex justify-between text-xs font-bold mb-1">
            <span>Pool: {formatMON(creator.totalInvested)}</span>
            <span>Goal: {formatMON(creator.investmentGoal)}</span>
          </div>
          <div className="neo-progress-bar w-full">
            <div 
              className="neo-progress-fill" 
              style={{ width: `${progressPercent}%`, backgroundColor: creator.color }}
            ></div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => setIsInvestModalOpen(true)}
          className="neo-btn justify-center w-full"
          style={{ backgroundColor: creator.color, color: creator.color === '#000000' || creator.color === '#FF3333' ? 'white' : 'black' }}
        >
          <Sparkles size={18} />
          Invest Now
        </button>
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
