"use client";

import { useEffect, useState } from "react";
import { formatMON } from "@/lib/mockData";

interface EarningsCounterProps {
  initialAmount: number;
}

export default function EarningsCounter({ initialAmount }: EarningsCounterProps) {
  const [displayAmount, setDisplayAmount] = useState(initialAmount);

  // Simulate live earnings ticking up
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Randomly increase amount slightly to simulate live earnings
      if (Math.random() > 0.7) {
        setDisplayAmount((prev) => prev + (Math.random() * 0.005));
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-black text-yellow-400 font-mono text-4xl md:text-6xl lg:text-8xl font-black p-4 md:p-8 border-4 border-black shadow-[8px_8px_0_0_#FFE500] select-none tracking-tight">
        {formatMON(displayAmount)}
      </div>
    </div>
  );
}
