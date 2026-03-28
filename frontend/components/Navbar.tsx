"use client";

import Link from "next/link";
import WalletConnect from "./WalletConnect";
import { Radio, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import LiveSetupModal from "./LiveSetupModal";

export default function Navbar() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showLiveSetup, setShowLiveSetup] = useState(false);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleGoLive = () => {
    setShowLiveSetup(true);
  };

  return (
    <>
      <LiveSetupModal isOpen={showLiveSetup} onClose={() => setShowLiveSetup(false)} />
      {/* AXIS Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-black text-white border-4 border-[#FF4500] px-6 py-3 font-black uppercase text-sm shadow-neo animate-in slide-in-from-top-10 flex items-center gap-3">
          <Zap size={18} className="text-[#FF4500] fill-current" />
          {toastMessage}
        </div>
      )}

      <nav className="sticky top-0 z-50 bg-[#D1D1D1] border-b-3 border-black py-0 px-0 flex items-stretch h-16 w-full overflow-hidden">
        {/* Logo Area */}
        <Link href="/" className="flex items-center justify-center bg-black px-8 group border-r-3 border-black">
          <h1 className="text-3xl font-black uppercase tracking-tighter text-[#FF4500]">
            Stream<span className="text-white">Pay</span>
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="flex-grow flex items-center px-8 gap-8 font-black text-gray-600 uppercase tracking-widest text-sm overflow-x-auto">
          <Link href="/feed" className="hover:text-black transition-colors whitespace-nowrap">
            Discover
          </Link>
          <Link href="/feed?live=true" className="hover:text-black transition-colors whitespace-nowrap">
            Stream
          </Link>
          <Link href="/feed?explore=true" className="hover:text-black transition-colors whitespace-nowrap">
            Creators
          </Link>
          <Link href="/dashboard" className="hover:text-black transition-colors whitespace-nowrap">
            Account
          </Link>
        </div>

        <div className="flex items-center gap-4 pr-6 shrink-0">
          <button 
            onClick={handleGoLive}
            className="neo-btn bg-white border-3 border-black px-4 py-2 hover:bg-[#FF4500] hover:text-white transition-colors uppercase font-black text-sm flex items-center gap-2 h-10 shadow-neo group active:translate-y-1 active:shadow-none"
          >
            <Radio size={16} className="text-[#FF4500] group-hover:text-white" />
            <span>Go Live</span>
          </button>
          
          <div className="h-full border-l-3 border-black ml-2 pl-4 flex items-center">
            <WalletConnect />
          </div>
        </div>
      </nav>
    </>
  );
}
