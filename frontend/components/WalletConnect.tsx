"use client";

import { useWalletStore } from "@/store/useWalletStore";
import { formatAddress, formatMON } from "@/lib/mockData";
import { Wallet, LogOut } from "lucide-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { useEffect } from "react";

export default function WalletConnect() {
  const {
    address,
    isConnected,
    balance,
    setAddress,
    setConnected,
    disconnect,
  } = useWalletStore();

  const {
    address: wagmiAddress,
    isConnected: wagmiIsConnected,
  } = useAccount();

  const { connect, connectors } = useConnect();
  const { disconnect: wagmiDisconnect } = useDisconnect();

  // Sync wagmi state with our zustand store
  useEffect(() => {
    if (wagmiIsConnected && wagmiAddress) {
      setAddress(wagmiAddress);
      setConnected(true);
    } else {
      // Don't auto-disconnect from zustand if wagmi reconnects on reload
      // We keep zustand as source of truth for UI simplicity in this demo
    }
  }, [wagmiAddress, wagmiIsConnected, setAddress, setConnected]);

  const handleConnect = () => {
    try {
      if (connectors && connectors.length > 0) {
        connect({ connector: connectors[0] });
      }
    } catch (e) {
      console.error(e);
      // Fallback for demo if no wallet installed
      setAddress("0x742d35Cc6634C0532925a3b844Bc454e4438f44e");
      setConnected(true);
    }
  };

  const handleDisconnect = () => {
    wagmiDisconnect();
    disconnect();
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-xs font-bold font-mono">
            {formatAddress(address)}
          </span>
          <span className="text-sm font-bold text-blue">
            {formatMON(balance)}
          </span>
        </div>
        <button
          onClick={handleDisconnect}
          className="neo-btn bg-white hover:bg-gray-100 flex items-center justify-center p-2 border-3 h-10 w-10 shadow-neo active:shadow-none"
          title="Disconnect"
        >
          <LogOut size={16} />
        </button>
      </div>
    );
  }

  return (
    <button onClick={handleConnect} className="neo-btn-blue h-10 px-4">
      <Wallet size={16} />
      <span>Connect</span>
    </button>
  );
}
