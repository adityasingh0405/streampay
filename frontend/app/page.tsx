import Link from "next/link";
import { ArrowRight, Play, Zap, TrendingUp, HandCoins } from "lucide-react";
import EarningsCounter from "@/components/EarningsCounter";

export default function Home() {
  return (
    <div className="flex flex-col flex-grow items-center w-full px-4 pt-10 pb-20 bg-[#D1D1D1]">
      
      {/* Hero Section - AXIS Style */}
      <section className="max-w-5xl w-full text-center mb-24 relative mt-12 md:mt-24">
        {/* Decorative blocks */}
        <div className="absolute -top-12 -left-12 w-32 h-16 bg-[#FF4500] hidden lg:block border-4 border-black shadow-neo rotate-[-3deg]"></div>
        <div className="absolute top-40 -right-12 w-20 h-20 bg-black hidden lg:block border-4 border-white shadow-[6px_6px_0_0_#FF4500] animate-float"></div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8 text-black z-10 relative">
          <span className="bg-black text-white px-6 inline-block mb-4 transform -rotate-1 shadow-[8px_8px_0_0_#FF4500]">Kill Ads.</span><br />
          Pay Creators <br />
          <span className="bg-[#FF4500] text-black px-6 inline-block mt-4 transform rotate-1 shadow-[8px_8px_0_0_#000]">Directly.</span>
        </h1>

        <div className="max-w-2xl mx-auto mb-12 p-6 border-4 border-black bg-white shadow-neo-xl rotate-[-1deg]">
          <p className="text-xl md:text-2xl font-black uppercase leading-tight italic">
            Watch premium content. Pay per view instantly on Monad Testnet.
          </p>
          <div className="h-1 w-full bg-[#FF4500] mt-4" />
          <p className="mt-2 text-sm font-bold opacity-60 uppercase tracking-widest">
            Invest in creators & earn with them.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <Link href="/feed" className="neo-btn neo-btn-orange text-2xl px-12 py-5 shadow-neo hover:shadow-neo-xl transition-all h-20 flex items-center">
            <Play size={28} className="fill-current" />
            START WATCHING
          </Link>
          <a href="#how-it-works" className="neo-btn bg-white text-2xl px-12 py-5 h-20 shadow-neo">
            HOW IT WORKS <ArrowRight size={24} />
          </a>
        </div>
      </section>

      {/* Live Earnings Section */}
      <section className="w-full max-w-5xl mb-32 px-4 relative">
        <div className="absolute -top-8 -right-4 bg-[#FF4500] text-black py-2 px-6 border-4 border-black font-black uppercase rotate-6 z-10 shadow-neo">
          NETWORK LIVE
        </div>
        <div className="neo-card p-10 md:p-16 text-center bg-white border-4 relative overflow-hidden">
          {/* Background grid pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 flex items-center justify-center gap-3 relative z-10">
            <Zap size={32} className="text-[#FF4500] fill-current" />
            Total Creator Earnings
          </h2>
          <p className="text-gray-500 font-black uppercase text-xs tracking-[.3em] mb-10 relative z-10">Updated every second on-chain</p>
          
          <EarningsCounter initialAmount={1240.5} />
          
          <div className="mt-12 flex justify-center gap-6 flex-wrap relative z-10">
            <div className="bg-black text-white border-3 border-black px-6 py-3 font-black uppercase shadow-neo text-sm">
              <span className="text-[#FF4500]">90%</span> to Creators
            </div>
            <div className="bg-white text-black border-3 border-black px-6 py-3 font-black uppercase shadow-neo text-sm">
              <span className="text-[#FF4500]">10%</span> to Investors
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="how-it-works" className="w-full max-w-7xl px-4">
        <div className="grid md:grid-cols-3 gap-12">
          
          <div className="neo-card-orange p-10 flex flex-col items-start hover:-translate-y-4 transition-all group border-4">
            <div className="w-20 h-20 bg-white border-4 border-black flex items-center justify-center shadow-neo mb-8 group-hover:rotate-6 transition-transform">
              <Play size={40} className="text-black fill-current" />
            </div>
            <h3 className="text-3xl font-black uppercase mb-6 tracking-tighter leading-none">Pay Per View</h3>
            <p className="font-bold text-black text-lg leading-tight uppercase">
              No subscriptions. No ads. Connect your wallet and pay fractions of a MON to watch.
            </p>
          </div>

          <div className="neo-card p-10 flex flex-col items-start hover:-translate-y-4 transition-all group border-4 bg-white">
            <div className="w-20 h-20 bg-black text-[#FF4500] border-4 border-black flex items-center justify-center shadow-neo mb-8 group-hover:-rotate-6 transition-transform">
              <TrendingUp size={40} />
            </div>
            <h3 className="text-3xl font-black uppercase mb-6 tracking-tighter leading-none">Invest in Success</h3>
            <p className="font-bold text-gray-700 text-lg leading-tight uppercase">
              Spot talent early? Invest MON into a creator's pool and earn a permanent percentage of revenue.
            </p>
          </div>

          <div className="neo-card p-10 flex flex-col items-start hover:-translate-y-4 transition-all group border-4 bg-black text-white">
            <div className="w-20 h-20 bg-[#FF4500] text-black border-4 border-white flex items-center justify-center shadow-[6px_6px_0_0_#FFF] mb-8 group-hover:scale-110 transition-transform">
              <HandCoins size={40} />
            </div>
            <h3 className="text-3xl font-black uppercase mb-6 tracking-tighter leading-none">Instant Settlement</h3>
            <p className="font-bold text-gray-300 text-lg leading-tight uppercase">
              Creators get paid the second a viewer unlocks their video. No 30-day waits. Just pure code.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
