"use client";
import { useState } from "react";
import { useBehavioralScore } from "@/hooks/useBehavioralScore";
import { FinsightIntelligence } from "./FinsightIntelligence";
import { NudgeEngine } from "./NudgeEngine";
import { TradePanel } from "./TradePanel";
import { TradingVows } from "./TradingVows";
import { BehavioralDNA } from "./BehavioralDNA";
import { ThinkingLog } from "./ThinkingLog";
import { ChartAnalyzer } from "./ChartAnalyzer";
import { CrisisSupport } from "./CrisisSupport";
import { LanguageSelector } from "./LanguageSelector";
import { MindfulSpeedBump } from "./MindfulSpeedBump";
import type { Language } from "@/types";
import { RefreshCw, Shield } from "lucide-react";

export function Dashboard() {
  const { analysis, loading, refresh } = useBehavioralScore(30000);
  const [language, setLanguage] = useState<Language>("en");
  const [crisisDismissed, setCrisisDismissed] = useState(false);
  const [chartInsight, setChartInsight] = useState<string | null>(null);

  const showCrisis = analysis?.crisis_detected && !crisisDismissed;

  return (
    <div className="min-h-screen bg-[#0b0b14] text-white">
      {/* Crisis overlay */}
      {showCrisis && (
        <CrisisSupport
          crisisScore={analysis.crisis_score}
          crisisDetected={true}
          language={language}
          onDismiss={() => setCrisisDismissed(true)}
        />
      )}
      
      {/* Mindful Speed Bump */}
      <MindfulSpeedBump analysis={analysis} />
      
      {/* Nudge banner */}
      <NudgeEngine analysis={analysis} />

      {/* Header */}
      <header className="border-b border-gray-800/50 px-6 py-3 flex items-center justify-between mt-16">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-bold tracking-wide">FINSIGHT OS</span>
          <span className="text-[10px] text-gray-500 border border-gray-700 rounded px-1.5 py-0.5">
            DEMO · gemma-4-e4b · edge-ai
          </span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector selected={language} onChange={setLanguage} />
          <button onClick={refresh} disabled={loading}
            className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors">
            <RefreshCw className={`w-4 h-4 text-gray-400 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-12 gap-4">
        {/* Left: 8 cols */}
        <div className="col-span-8 space-y-4">
          {/* Watchlist */}
          <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Watchlist · NSE F&O</h3>
              <span className="text-[10px] text-gray-600">Live quotes paused in demo</span>
            </div>
            {[
              ["NIFTY 50",  "22,450.75", "+0.34%", true],
              ["BANKNIFTY", "47,230.10", "-0.82%", false],
              ["RELIANCE",  "2,890.40",  "+1.12%", true],
              ["INFY",      "1,540.20",  "-0.45%", false],
            ].map(([sym, price, chg, up]: any) => (
              <div key={sym} className="flex items-center justify-between py-2 border-b border-gray-800/50 last:border-0">
                <span className="text-sm text-gray-200 font-mono">{sym}</span>
                <div className="text-right">
                  <p className="text-sm font-medium">₹{price}</p>
                  <p className={`text-[11px] ${up ? "text-emerald-400" : "text-red-400"}`}>{chg}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chart Analyzer (Gemma Vision) */}
          <ChartAnalyzer onInsight={setChartInsight} />

          {/* Trade Panel */}
          <TradePanel analysis={analysis} />

          {/* Recent trades */}
          <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Today's Trades · <span className="text-red-400">-₹8,440 session P&L</span>
            </h3>
            {[
              ["14:32", "NIFTY24DEC22000CE",   50, -3200],
              ["14:20", "RELIANCE",             10, -1450],
              ["14:08", "BANKNIFTY24DEC47000PE",25, -4100],
              ["13:55", "INFY",                 15, -890],
              ["13:40", "TATAMOTORS",           20,  1200],
            ].map(([t, sym, qty, pnl]: any, i: number) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800/50 last:border-0">
                <div>
                  <p className="text-xs text-white font-mono">{sym}</p>
                  <p className="text-[10px] text-gray-500">{t} · qty {qty}</p>
                </div>
                <span className={`text-sm font-medium ${pnl < 0 ? "text-red-400" : "text-emerald-400"}`}>
                  {pnl < 0 ? "-" : "+"}₹{Math.abs(pnl).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Gemma Thinking Log */}
          <ThinkingLog log={analysis?.thinking_log ?? null} />
        </div>

        {/* Right: 4 cols */}
        <aside className="col-span-4 space-y-4">
          <FinsightIntelligence analysis={analysis} loading={loading} />
          <BehavioralDNA />
          <TradingVows />

          {/* Margin */}
          <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-4 space-y-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Margin Usage</h3>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Used</span>
              <span className="text-red-400 font-bold">85% ⚠</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full animate-pulse" style={{ width: "85%" }} />
            </div>
            <div className="flex justify-between text-[10px] text-gray-600">
              <span>₹85,000 used</span><span>₹15,000 available</span>
            </div>
          </div>

          {/* Edge AI Trust Badge */}
          <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-3 text-center space-y-1">
            <p className="text-[10px] text-purple-300 font-semibold">🔒 PRIVACY-FIRST EDGE AI</p>
            <p className="text-[10px] text-gray-500">All behavioral analysis runs locally on your device via Ollama. Zero data sent to any server.</p>
          </div>
        </aside>
      </main>
    </div>
  );
}
