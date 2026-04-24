"use client";
import type { BehavioralAnalysis } from "@/types";
import { AlertCircle, TrendingUp, Shield } from "lucide-react";

interface Props { analysis: BehavioralAnalysis | null; loading: boolean; }

export function FinsightIntelligence({ analysis, loading }: Props) {
  if (!analysis) {
    return (
      <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-semibold text-white">FINSIGHT INTELLIGENCE</span>
        </div>
        <p className="text-xs text-gray-500">Loading behavioral analysis...</p>
      </div>
    );
  }

  const scoreColor = analysis.behavioral_score > 600 ? "text-red-400" : analysis.behavioral_score > 300 ? "text-amber-400" : "text-emerald-400";
  const riskColors = { high: "text-red-400", medium: "text-amber-400", low: "text-emerald-400" };

  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-purple-400" />
        <span className="text-sm font-semibold text-white">FINSIGHT INTELLIGENCE</span>
        {loading && <span className="text-[10px] text-gray-500 ml-auto">Analyzing...</span>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-black/30 rounded-lg p-3 text-center">
          <p className={`text-2xl font-bold ${scoreColor}`}>{analysis.behavioral_score}</p>
          <p className="text-[10px] text-gray-600 mt-1">Behavioral Score</p>
        </div>
        <div className={`bg-black/30 rounded-lg p-3 text-center border-l-2 ${riskColors[analysis.risk_level]}`}>
          <p className={`text-sm font-bold ${riskColors[analysis.risk_level]} uppercase`}>{analysis.risk_level}</p>
          <p className="text-[10px] text-gray-600 mt-1">Risk Level</p>
        </div>
      </div>

      {analysis.detected_pattern && (
        <div className="bg-amber-950/20 border border-amber-500/20 rounded-lg p-3">
          <p className="text-[10px] text-amber-400 uppercase tracking-wider font-semibold mb-1">Pattern Detected</p>
          <p className="text-sm text-amber-200">{analysis.detected_pattern}</p>
        </div>
      )}

      {analysis.nudge_message && (
        <div className="bg-purple-950/20 border border-purple-500/20 rounded-lg p-3">
          <p className="text-[10px] text-purple-400 uppercase tracking-wider font-semibold mb-1">Nudge</p>
          <p className="text-sm text-purple-200 italic">"{analysis.nudge_message}"</p>
        </div>
      )}
    </div>
  );
}
