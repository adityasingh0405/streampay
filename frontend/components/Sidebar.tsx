"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Rss, 
  Search, 
  Bell, 
  Wallet, 
  User, 
  Upload,
  LayoutDashboard,
  Radio,
  Menu,
  X,
  Zap
} from "lucide-react";
import UploadModal from "./UploadModal";
import NotificationsPanel from "./NotificationsPanel";

const NAV_ITEMS = [
  { label: "Feed", icon: Rss, href: "/feed" },
  { label: "Explore", icon: Search, href: "/feed?explore=true" },
  { label: "Stream", icon: Radio, href: "/feed?live=true" },
  { label: "Notifications", icon: Bell, href: "#", badge: 3, isAction: "notifications" },
  { label: "Wallet", icon: Wallet, href: "/dashboard?view=wallet" },
  { label: "Profile", icon: User, href: "/dashboard?view=profile" },
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Modal states
  const [showUpload, setShowUpload] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleAction = (action: string) => {
    if (action === "notifications") setShowNotifications(true);
    if (window.innerWidth < 1024) toggleSidebar();
  };

  return (
    <>
      <UploadModal isOpen={showUpload} onClose={() => setShowUpload(false)} />
      <NotificationsPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

      {/* AXIS Toast Notification (Global Fallback) */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[150] bg-black text-white border-4 border-[#FF4500] px-6 py-3 font-black uppercase text-sm shadow-neo animate-in slide-in-from-top-10 flex items-center gap-3">
          <Zap size={18} className="text-[#FF4500] fill-current" />
          {toastMessage}
        </div>
      )}

      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="fixed bottom-6 right-6 z-[60] lg:hidden w-16 h-16 bg-[#FF4500] border-4 border-black shadow-neo flex items-center justify-center active:translate-y-1 active:shadow-none transition-all"
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Sidebar Backdrop (Mobile) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Main */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 z-[55] w-64 bg-[#D1D1D1] border-r-3 border-black h-screen flex flex-col pt-4 overflow-y-auto transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Navigation Links */}
        <nav className="flex-grow">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const commonClasses = `neo-sidebar-link group transition-all duration-100 cursor-pointer active:bg-white/60 ${isActive ? 'active bg-white/40' : ''}`;

            if (item.isAction) {
              return (
                <button 
                  key={item.label} 
                  onClick={() => handleAction(item.isAction!)}
                  className={`w-full text-left outline-none ${commonClasses}`}
                >
                  <item.icon size={22} className={isActive ? 'text-[#FF4500]' : 'text-black'} />
                  <span>{item.label}</span>
                  
                  {item.badge && (
                    <span className="ml-auto bg-[#FF4500] text-black border-2 border-black w-6 h-6 flex items-center justify-center text-[10px] font-black shadow-neo-sm">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            }

            return (
              <Link 
                key={item.label} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`outline-none block ${commonClasses}`}
              >
                <item.icon size={22} className={isActive ? 'text-[#FF4500]' : 'text-black'} />
                <span>{item.label}</span>
                
                {item.badge && (
                  <span className="ml-auto bg-[#FF4500] text-black border-2 border-black w-6 h-6 flex items-center justify-center text-[10px] font-black shadow-neo-sm">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Upload Button at bottom */}
        <div className="p-4 border-t-3 border-black mt-auto bg-white/20">
          <button 
            onClick={() => setShowUpload(true)}
            className="neo-btn w-full justify-center gap-3 bg-white hover:bg-[#FF4500] hover:text-white border-4 shadow-neo transition-all active:translate-y-1 active:shadow-none"
          >
            <Upload size={20} />
            <span>Upload Content</span>
          </button>
        </div>
      </aside>
    </>
  );
}
