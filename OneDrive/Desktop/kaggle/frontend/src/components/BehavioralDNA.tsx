"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { BehavioralDNA, DNASession } from "@/types";
import { Dna, TrendingDown, AlertTriangle } from "lucide-react";

export function BehavioralDNA() {
  const [dna, setDNA] = useState<BehavioralDNA | null>(null);

  useEffect(() => {
    api.getDNA().then(setDNA).catch(console.error);
  }, []);

  if (!dna || dna.total_sessions === 0) {
    return (
      <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Dna className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-semibold text-white">BEHAVIORAL DNA</span>
        </div>
        <p className="text-xs text-gray-500">Building your behavioral profile... Complete your first session.</p>
      </div>
    );
  }

  const maxScore = Math.max(...dna.sessions.map(s => s.score), 1);

  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Dna className="w-4 h-4 text-purple-400" />
        <span className="text-sm font-semibold text-white">BEHAVIORAL DNA</span>
        <span className="text-[10px] text-gray-500 ml-auto">{dna.total_sessions} sessions</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Avg Score", value: dna.avg_score, color: dna.avg_score > 600 ? "text-red-400" : "text-emerald-400" },
          { label: "High Risk %", value: `${Math.round(dna.high_risk_rate * 100)}%`, color: "text-amber-400" },
          { label: "Streak", value: `${dna.streak_days}d`, color: dna.streak_days > 2 ? "text-red-400" : "text-gray-400" },
        ].map(s => (
          <div key={s.label} className="bg-black/30 rounded-lg p-2 text-center">
            <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-gray-600">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 bg-red-950/20 border border-red-500/20 rounded-lg px-3 py-2">
        <TrendingDown className="w-3 h-3 text-red-400 shrink-0" />
        <p className="text-xs text-red-300">Dominant: <span className="font-bold">{dna.dominant_pattern}</span></p>
      </div>

      <div>
        <p className="text-[10px] text-gray-600 mb-1.5">Risk score — last {dna.sessions.length} sessions</p>
        <div className="flex items-end gap-0.5 h-12">
          {dna.sessions.map((s, i) => (
            <div key={i} title={`${s.date}: ${s.score}`}
              className="flex-1 rounded-sm transition-all"
              style={{
                height: `${Math.max(8, (s.score / maxScore) * 100)}%`,
                background: s.score > 600 ? "#ef4444" : s.score > 300 ? "#f59e0b" : "#10b981",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
