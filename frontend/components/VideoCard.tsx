"use client";

import { Video, getCreatorById, formatMON } from "@/lib/mockData";
import { HandCoins } from "lucide-react";
import Link from "next/link";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const creator = getCreatorById(video.creatorId);

  return (
    <div className="neo-card group overflow-hidden flex flex-col h-full bg-white relative transition-all duration-300 hover:-translate-y-2 border-3 border-black shadow-neo">
      {/* Thumbnail Container */}
      <Link href={`/feed?v=${video.id}`} className="block relative aspect-video border-b-3 border-black overflow-hidden bg-black">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-90 group-hover:opacity-100"
        />
        
        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
          <div className="w-16 h-16 rounded-full bg-[#FF4500] border-3 border-black flex items-center justify-center shadow-neo">
             <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-black border-b-[10px] border-b-transparent ml-1" />
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-black text-xl uppercase leading-tight mb-2 group-hover:text-[#FF4500] transition-colors line-clamp-2">
          {video.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-4 text-sm font-black text-gray-500 uppercase">
          <span>@{creator?.handle}</span>
          <span>•</span>
          <span>{video.duration}</span>
        </div>

        {/* Action Row */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <Link 
            href={`/creator/${creator?.id}`}
            className="neo-btn neo-btn-orange flex-grow justify-center py-2 text-sm shadow-neo active:shadow-none translate-y-0 active:translate-y-1"
          >
            INVEST
          </Link>
          
          <div className="bg-black text-white px-3 py-2 font-mono text-xs border-2 border-black flex items-center gap-2">
             <span>{video.views.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
