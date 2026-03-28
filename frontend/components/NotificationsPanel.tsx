"use client";

import { X, Bell, Zap, TrendingUp, Unlock, UserPlus } from "lucide-react";
import { MOCK_NOTIFICATIONS, Notification } from "@/lib/mockData";

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  if (!isOpen) return null;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "yield": return <TrendingUp size={18} className="text-[#FF4500]" />;
      case "unlock": return <Unlock size={18} className="text-black" />;
      case "follow": return <UserPlus size={18} className="text-black" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      
      <div className="relative w-full max-w-sm bg-[#D1D1D1] border-l-4 border-black h-full shadow-neo-xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="bg-black text-white p-6 flex justify-between items-center border-b-4 border-black">
          <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
            <Bell size={24} className="text-[#FF4500] fill-current" />
            Control Feed
          </h2>
          <button onClick={onClose} className="hover:text-[#FF4500] transition-colors">
            <X size={28} />
          </button>
        </div>

        {/* Scrollable Notifications List */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-2 pl-2">Latest Activity</div>
          
          {MOCK_NOTIFICATIONS.map((notif) => (
            <div 
              key={notif.id} 
              className="bg-white border-3 border-black p-4 shadow-neo-sm hover:shadow-neo transition-all group relative overflow-hidden"
            >
              {notif.type === 'yield' && (
                <div className="absolute top-0 right-0 bg-[#FF4500] text-black text-[8px] font-black px-2 py-0.5 border-b-2 border-l-2 border-black">
                  +MON
                </div>
              )}
              
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-black text-white flex items-center justify-center border-2 border-black group-hover:bg-[#FF4500] group-hover:text-black transition-colors">
                  {getIcon(notif.type)}
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase leading-tight">{notif.message}</p>
                  <p className="text-[9px] font-black tracking-widest text-black/40 uppercase">
                    {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} // {new Date(notif.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Brand/Status Footer */}
        <div className="bg-black text-white p-4 text-center border-t-4 border-black">
          <div className="flex items-center justify-center gap-3">
            <Zap size={14} className="text-[#FF4500] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Connection: Monad Testnet</span>
          </div>
        </div>
      </div>
    </div>
  );
}
