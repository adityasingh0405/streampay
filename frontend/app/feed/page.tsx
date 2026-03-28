"use client";

import { VIDEOS, getVideoById, getCreatorById } from "@/lib/mockData";
import VideoCard from "@/components/VideoCard";
import VideoPlayer from "@/components/VideoPlayer";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Search, Flame, Shuffle, Radio } from "lucide-react";
import Link from "next/link";
import { Suspense, useMemo } from "react";

function FeedContent() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get("v");
  const isExplore = searchParams.get("explore") === "true";
  const isLive = searchParams.get("live") === "true";
  const selectedVideo = videoId ? getVideoById(videoId) : null;
  const creator = selectedVideo ? getCreatorById(selectedVideo.creatorId) : null;

  const filteredVideos = useMemo(() => {
    if (isLive) return VIDEOS.filter(v => v.isLive);
    if (isExplore) return [...VIDEOS].sort(() => Math.random() - 0.5);
    return VIDEOS;
  }, [isExplore, isLive]);

  return (
    <>
      {!selectedVideo && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b-4 border-black pb-8">
          <h1 className="text-5xl font-black uppercase tracking-tighter flex items-center gap-4">
            <span className="bg-black text-[#FF4500] border-4 border-black p-3 shadow-neo">
              {isLive ? <Radio size={32} className="animate-pulse" /> : isExplore ? <Shuffle size={32} /> : <Flame size={32} className="fill-current" />}
            </span>
            {isLive ? "LIVE NOW" : isExplore ? "Explore Axis" : "Trending Now"}
          </h1>
          
          <div className="relative w-full md:w-auto">
            <input 
              type="text" 
              placeholder="SEARCH CREATORS..." 
              className="neo-input md:w-96 pr-12 bg-white border-4 font-black uppercase text-sm"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          </div>
        </div>
      )}

      {selectedVideo ? (
        // Active Video View
        <div className="animate-in fade-in duration-500">
          <div className="mb-6">
            <Link href="/feed" className="neo-btn bg-white hover:bg-black hover:text-white px-6 py-2 shadow-neo border-4 inline-flex items-center gap-3 font-black uppercase">
              <ArrowLeft size={18} /> BACK TO FEED
            </Link>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <VideoPlayer 
                video={selectedVideo} 
                creatorAddress={creator?.walletAddress || "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"} 
              />
              
              <div className="mt-10 bg-white border-4 border-black p-8 shadow-neo relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#FF4500] text-black font-black uppercase text-[10px] px-3 py-1 border-b-2 border-l-2 border-black">
                  AXIS VERIFIED
                </div>
                <div className="flex flex-wrap gap-3 mb-6">
                  {selectedVideo.tags.map(tag => (
                    <span key={tag} className="bg-black text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 shadow-neo-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-4xl font-black uppercase tracking-tight mb-6 leading-none">{selectedVideo.title}</h2>
                <p className="text-gray-500 font-bold leading-relaxed uppercase space-y-4">
                  {selectedVideo.description}
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-black text-white border-4 border-black p-5 font-black uppercase text-2xl shadow-neo transform rotate-1">
                UP NEXT
              </div>
              <div className="flex flex-col gap-6">
                {VIDEOS.filter(v => v.id !== selectedVideo.id).slice(0, 3).map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Video Grid View
        <div className="max-w-7xl mx-auto py-4">
          {/* AXIS Style Header */}
          {isLive && (
            <div className="bg-black text-white p-4 border-4 border-black mb-10 shadow-neo flex items-center justify-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#FF4500] animate-pulse" />
              <p className="font-black uppercase tracking-[.5em]">Live Streams Only — Monad Gateway Active</p>
              <div className="w-3 h-3 rounded-full bg-[#FF4500] animate-pulse" />
            </div>
          )}
          {isExplore && (
            <div className="bg-[#FF4500] text-black p-4 border-4 border-black mb-10 shadow-neo animate-bounce-y" style={{ animation: 'none' }}>
               <p className="font-black uppercase tracking-[.5em] text-center">Randomizing Feed for Discovery Mode</p>
            </div>
          )}
          
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
              {isLive ? "Live" : isExplore ? "Discovery" : "Featured"}<br />
              <span className="text-[#FF4500] tracking-[-.05em]">{isLive ? "& Broadcasting" : "& Platform Latest"}</span>
            </h1>
            <div className="h-3 w-32 bg-black" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default function FeedPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col min-h-screen bg-[#D1D1D1]">
      <Suspense fallback={<div className="font-black text-center py-20 uppercase tracking-widest">Compiling Feed...</div>}>
        <FeedContent />
      </Suspense>
    </div>
  );
}
