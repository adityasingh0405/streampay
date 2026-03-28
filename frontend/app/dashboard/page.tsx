"use client";

import { useWalletStore } from "@/store/useWalletStore";
import { formatMON, formatAddress, getCreatorById } from "@/lib/mockData";
import { Eye, TrendingUp, HandCoins, Activity, Wallet, FileText, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const { isConnected, address, balance, watchedVideos, investments, transactions, totalSpent, totalInvested, totalReturns } = useWalletStore();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const [activeTab, setActiveTab] = useState<"viewer" | "investor">("viewer");

  useEffect(() => {
    if (view === "profile") {
      setActiveTab("investor");
    } else if (view === "wallet") {
      setActiveTab("viewer");
    }
  }, [view]);

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <div className="w-24 h-24 bg-white border-4 border-black border-dashed flex items-center justify-center mb-6">
          <Wallet size={48} className="text-gray-300" />
        </div>
        <h1 className="text-4xl font-black uppercase mb-4 shadow-[4px_4px_0_0_#FF4500] inline-block px-4 py-1 border-4 border-black">Access Denied</h1>
        <p className="text-xl font-black uppercase text-gray-400 max-w-md">Connect your wallet to view the AXIS dashboard.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-[#D1D1D1]">
      
      {/* Header Info - AXIS Style */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b-4 border-black pb-10">
        <div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 flex items-center gap-3">
            <span className="bg-black text-white px-4 py-1 pb-2 shadow-[6px_6px_0_0_#FF4500]">AXIS</span>
            CONTROL
          </h1>
          <div className="flex items-center gap-3 font-black uppercase text-sm bg-white border-3 border-black px-4 py-2 shadow-neo mt-2">
            <Wallet size={18} className="text-[#FF4500]" /> 
            <span>{address ? formatAddress(address) : "0x00...000"}</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-[#FF4500]">{formatMON(balance)}</span>
          </div>
        </div>

        {/* Action Toggle */}
        <div className="flex bg-white border-4 border-black p-1 shadow-neo self-stretch md:self-auto min-w-[320px]">
          <button 
            onClick={() => setActiveTab("viewer")}
            className={`flex-1 font-black uppercase tracking-widest text-xs py-3 px-6 transition-all border-2 ${activeTab === "viewer" ? "bg-black text-white border-black" : "bg-transparent text-gray-400 border-transparent hover:text-black"}`}
          >
            Viewer
          </button>
          <button 
            onClick={() => setActiveTab("investor")}
            className={`flex-1 font-black uppercase tracking-widest text-xs py-3 px-6 transition-all border-2 ${activeTab === "investor" ? "bg-[#FF4500] text-black border-black" : "bg-transparent text-gray-400 border-transparent hover:text-black"}`}
          >
            Investor
          </button>
        </div>
      </div>

      {activeTab === "viewer" ? (
        // VISIBILITY: VIEWER TAB
        <div className="space-y-10">
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="neo-card p-8 bg-[#FF4500] flex items-center justify-between border-4 shadow-neo-lg text-black">
              <div>
                <p className="font-black text-xs tracking-[.4em] uppercase mb-2 opacity-60">Total Settled</p>
                <p className="text-5xl font-black">{formatMON(totalSpent)}</p>
              </div>
              <HandCoins size={56} className="opacity-20" />
            </div>
            <div className="neo-card bg-black text-white p-8 flex items-center justify-between border-4 shadow-neo-lg">
              <div>
                <p className="font-black text-xs tracking-[.4em] uppercase mb-2 opacity-50">Content Unlocked</p>
                <p className="text-5xl font-black text-[#FF4500]">{watchedVideos.length}</p>
              </div>
              <Eye size={56} className="text-[#FF4500] opacity-40" />
            </div>
          </div>

          <div className="neo-card bg-white border-4 shadow-neo overflow-hidden">
            <div className="border-b-4 border-black p-5 bg-[#D1D1D1] flex items-center gap-3">
              <Activity size={24} className="text-[#FF4500]" />
              <h2 className="text-2xl font-black uppercase tracking-tighter">Watch History</h2>
            </div>
            
            {watchedVideos.length === 0 ? (
              <div className="p-20 text-center text-gray-400 font-black uppercase tracking-widest">
                No content unlocked in session.
                <div className="mt-8">
                  <Link href="/feed" className="neo-btn neo-btn-orange text-lg">Browse Main Feed</Link>
                </div>
              </div>
            ) : (
              <div className="divide-y-4 divide-black">
                {watchedVideos.map((video, idx) => (
                  <div key={`${video.videoId}-${idx}`} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 hover:bg-gray-50 transition-colors">
                    <div>
                      <h3 className="font-black text-xl uppercase leading-tight">{video.title}</h3>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">
                        Creator: {video.creatorId} • {new Date(video.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                      <span className="bg-[#FF4500] text-black px-3 py-1 font-black text-sm border-2 border-black">-{formatMON(video.paidAmount)}</span>
                      <Link href={`/feed?v=${video.videoId}`} className="bg-black text-white p-3 border-3 border-black hover:bg-[#FF4500] hover:text-black transition-colors shadow-neo-sm active:shadow-none translate-y-0 active:translate-y-1">
                        <Eye size={20} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        // VISIBILITY: INVESTOR TAB
        <div className="space-y-10">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="neo-card p-8 bg-white border-4 flex flex-col shadow-neo">
              <p className="font-black text-xs tracking-[.4em] uppercase mb-4 opacity-40">Total Position</p>
              <p className="text-4xl font-black mt-auto">{formatMON(totalInvested)}</p>
            </div>
            
            <div className="neo-card p-8 bg-[#FF4500] text-black border-4 flex flex-col shadow-neo transform hover:-translate-y-1 transition-transform">
              <p className="font-black text-xs tracking-[.4em] uppercase mb-4 opacity-100">Claimable Yield</p>
              <div className="mt-auto flex justify-between items-end">
                <p className="text-4xl font-black">+{formatMON(totalReturns)}</p>
                <div className="bg-black text-white font-black text-[10px] px-3 py-1 border-2 border-black shadow-neo-sm transform rotate-6">LIQUID</div>
              </div>
            </div>

            <div className="neo-card p-8 bg-black text-white border-4 flex flex-col md:col-span-2 lg:col-span-1 shadow-neo">
              <p className="font-black text-xs tracking-[.4em] uppercase mb-4 opacity-40">Performance</p>
              <div className="mt-auto flex items-center gap-4">
                <TrendingUp size={44} className="text-[#FF4500]" />
                <p className="text-4xl font-black text-[#FF4500]">
                  {totalInvested > 0 ? `+${((totalReturns / totalInvested) * 100).toFixed(2)}%` : "0.00%"}
                </p>
              </div>
            </div>
          </div>

          <div className="neo-card bg-white">
            <div className="border-b-3 border-black p-4 bg-yellow-400 flex justify-between items-center">
              <div className="flex items-center gap-2 text-black">
                <FileText size={20} />
                <h2 className="text-xl font-black uppercase tracking-wide">Investment Portfolio</h2>
              </div>
              <button className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:underline">
                Claim All <ArrowUpRight size={14} />
              </button>
            </div>
            
            {investments.length === 0 ? (
              <div className="p-12 text-center text-gray-500 font-bold">
                You haven't invested in any creators yet.
                <div className="mt-4">
                  <Link href="/feed" className="neo-btn-yellow text-sm">Find Creators</Link>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-3 border-black bg-neo-gray uppercase text-xs font-black tracking-wider text-gray-600">
                      <th className="p-4 border-r-3 border-black">Creator</th>
                      <th className="p-4 border-r-3 border-black">Invested</th>
                      <th className="p-4 border-r-3 border-black">Returns</th>
                      <th className="p-4 border-r-3 border-black">ROI</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-3 divide-black">
                    {investments.map((inv, idx) => {
                      const c = getCreatorById(inv.creatorId);
                      return (
                        <tr key={`${inv.creatorId}-${idx}`} className="hover:bg-yellow-50 transition-colors">
                          <td className="p-4 border-r-3 border-black">
                            <Link href={`/creator/${inv.creatorId}`} className="font-bold flex items-center gap-2 hover:text-blue group">
                              <span className="w-8 h-8 flex items-center justify-center bg-white border-2 border-black group-hover:bg-blue group-hover:text-white transition-colors">{c?.avatar}</span>
                              {inv.creatorName}
                            </Link>
                          </td>
                          <td className="p-4 border-r-3 border-black font-mono font-bold">
                            {formatMON(inv.amount)}
                          </td>
                          <td className="p-4 border-r-3 border-black font-mono font-bold text-green-600">
                            +{formatMON(inv.returns)}
                          </td>
                          <td className="p-4 border-r-3 border-black font-mono font-black text-green-500">
                            +{inv.roi.toFixed(2)}%
                          </td>
                          <td className="p-4 text-right">
                            <button className="neo-btn bg-black text-white text-xs px-3 py-1 scale-90 hover:scale-95 inline-flex whitespace-nowrap">
                              Claim MON
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
