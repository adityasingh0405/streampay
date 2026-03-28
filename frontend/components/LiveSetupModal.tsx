"use client";

import { useState } from "react";
import { X, Radio, Play, Copy, CheckCircle2 } from "lucide-react";

interface LiveSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LiveSetupModal({ isOpen, onClose }: LiveSetupModalProps) {
  const [step, setStep] = useState<"setup" | "broadcasting">("setup");
  const [streamKey] = useState("monad_live_sk_" + Math.random().toString(36).slice(2, 10));

  if (!isOpen) return null;

  const handleStart = () => {
    setStep("broadcasting");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Simple mock feedback would go here
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-white border-4 border-black shadow-neo-xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#FF4500] text-black p-4 flex justify-between items-center border-b-4 border-black">
          <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2">
            <Radio size={20} className="animate-pulse" />
            Live Broadcast Setup
          </h2>
          <button onClick={onClose} className="hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {step === "setup" ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-black/40">Stream Provider</label>
                <div className="flex gap-4">
                  <div className="flex-1 p-3 border-3 border-black bg-[#D1D1D1] text-black font-black uppercase text-center shadow-neo-sm">
                    RTMP (DEFAULT)
                  </div>
                  <div className="flex-1 p-3 border-3 border-black bg-white text-black/20 font-black uppercase text-center cursor-not-allowed">
                    HLS (COMING)
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-black/40">Broadcast Key</label>
                <div className="relative flex">
                  <input 
                    readOnly
                    type="password"
                    value={streamKey}
                    className="neo-input flex-grow bg-[#D1D1D1] text-black font-black uppercase tracking-[0.2em] rounded-none border-r-0"
                  />
                  <button 
                    onClick={() => copyToClipboard(streamKey)}
                    className="bg-black text-white px-4 border-3 border-black hover:bg-[#FF4500] hover:text-black transition-colors"
                  >
                    <Copy size={18} />
                  </button>
                </div>
                <p className="text-[10px] font-black uppercase text-black/60 tracking-widest mt-2">Security: Keep this key private at all times.</p>
              </div>

              <div className="p-6 bg-black text-white border-4 border-black shadow-neo space-y-4">
                 <h3 className="text-sm font-black uppercase tracking-[0.3em] flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-[#FF4500] animate-pulse" />
                   Status: Ready
                 </h3>
                 <p className="text-xs font-bold text-gray-400 leading-relaxed uppercase">
                   Your account is authorized for broadcast on Monad Testnet. Use any RTMP-compatible encoder to connect.
                 </p>
              </div>

              <button 
                onClick={handleStart}
                className="neo-btn neo-btn-orange w-full justify-center gap-3 text-lg border-4 shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                <Play size={24} className="fill-current" />
                START BROADCAST
              </button>
            </div>
          ) : (
            <div className="py-12 text-center space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-black text-[#FF4500] border-4 border-black shadow-neo animate-pulse rounded-none">
                <Radio size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black uppercase tracking-tighter">On Air</h3>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Transmitting to Monad Gateway...</p>
              </div>
              <div className="flex justify-center gap-4">
                <button className="neo-btn bg-black text-white px-6 py-2 text-xs font-black uppercase border-3 shadow-neo hover:bg-white hover:text-black">
                  View Feed
                </button>
                <button 
                  onClick={onClose}
                  className="neo-btn bg-white text-black px-6 py-2 text-xs font-black uppercase border-3 shadow-neo hover:bg-black hover:text-white"
                >
                  End Stream
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="bg-black text-white p-2 border-t-2 border-black flex justify-between px-6">
           <span className="text-[8px] font-black tracking-widest text-[#FF4500] uppercase">Axis Broadcaster v1.02</span>
           <span className="text-[8px] font-black tracking-widest text-white/40 uppercase">Latency: 42ms</span>
        </div>
      </div>
    </div>
  );
}
