"use client";
import type { BehavioralAnalysis } from "@/types";
import { Send } from "lucide-react";

interface Props { analysis: BehavioralAnalysis | null; }

export function TradePanel({ analysis }: Props) {
  if (!analysis) return null;

  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-4 space-y-3">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Quick Trade</h3>
      
      <div className="grid grid-cols-3 gap-2">
        <input type="text" placeholder="NIFTY" className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500" />
        <input type="number" placeholder="Qty" className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500" />
        <input type="number" placeholder="₹Price" className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button className={`py-2 rounded-lg font-medium text-sm transition-colors
          ${analysis.risk_level === "high" 
            ? "bg-gray-700 text-gray-400 cursor-not-allowed opacity-50" 
            : "bg-emerald-600/80 hover:bg-emerald-500 text-white"}`}
          disabled={analysis.risk_level === "high"}>
          BUY
        </button>
        <button className={`py-2 rounded-lg font-medium text-sm transition-colors
          ${analysis.risk_level === "high" 
            ? "bg-gray-700 text-gray-400 cursor-not-allowed opacity-50" 
            : "bg-red-600/80 hover:bg-red-500 text-white"}`}
          disabled={analysis.risk_level === "high"}>
          SELL
        </button>
      </div>

      {analysis.risk_level === "high" && (
        <p className="text-[10px] text-red-400 text-center">High risk detected — trading disabled</p>
      )}
    </div>
  );
}
