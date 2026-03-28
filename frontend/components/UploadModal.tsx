"use client";

import { useState } from "react";
import { X, Upload, CheckCircle2 } from "lucide-react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "0.1",
    category: "FILM",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate upload delay
    setTimeout(() => setStep("success"), 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-[#D1D1D1] border-4 border-black shadow-neo-xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-black text-white p-4 flex justify-between items-center border-b-4 border-black">
          <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2">
            <Upload size={20} className="text-[#FF4500]" />
            Ingest Content
          </h2>
          <button onClick={onClose} className="hover:text-[#FF4500] transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          {step === "form" ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-black/60">Content Title</label>
                <input 
                  required
                  type="text"
                  placeholder="E.G. DECENTRALIZED PROTOCOLS 101"
                  className="neo-input w-full bg-white text-black font-black uppercase"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-black/60">Narrative / Description</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="EXPLAIN THE VALUE PROPOSITION..."
                  className="neo-input w-full bg-white text-black font-black uppercase resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-black/60">Access Fee (MON)</label>
                  <input 
                    required
                    type="number"
                    step="0.01"
                    className="neo-input w-full bg-white text-black font-black"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-black/60">Category</label>
                  <select 
                    className="neo-input w-full bg-white text-black font-black uppercase"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option>FILM</option>
                    <option>MUSIC</option>
                    <option>EDUCATION</option>
                    <option>ART</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="neo-btn neo-btn-orange w-full justify-center gap-3 text-lg border-4 shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                  <Upload size={24} />
                  CONFIRM UPLOAD
                </button>
              </div>
            </form>
          ) : (
            <div className="py-12 text-center space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-black text-[#FF4500] border-4 border-black shadow-neo rounded-none">
                <CheckCircle2 size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black uppercase tracking-tighter">Content Ingested</h3>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Validating on Monad Testnet...</p>
              </div>
              <button 
                onClick={onClose}
                className="neo-btn bg-black text-white px-8 py-3 font-black uppercase border-4 shadow-neo hover:bg-[#FF4500] hover:text-black transition-colors"
              >
                Return to Control
              </button>
            </div>
          )}
        </div>

        {/* Brand Footer */}
        <div className="bg-black/5 p-4 text-center border-t-4 border-black/10">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">AXIS // CONTENT // PROTOCOL</p>
        </div>
      </div>
    </div>
  );
}
