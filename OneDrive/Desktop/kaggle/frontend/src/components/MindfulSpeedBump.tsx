"use client";
import { useState, useEffect } from "react";
import type { BehavioralAnalysis } from "@/types";
import { Lock, AlertTriangle } from "lucide-react";

interface Props { analysis: BehavioralAnalysis | null; }

export function MindfulSpeedBump({ analysis }: Props) {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (analysis?.risk_level === "high" && analysis?.nudge_message && !unlocked) {
      setOpen(true);
    }
  }, [analysis, unlocked]);

  if (!open || !analysis || analysis.risk_level !== "high") return null;
  if (unlocked) return null;

  const requiredPhrase = analysis.nudge_message;
  const isMatch = typed.toLowerCase() === requiredPhrase.toLowerCase();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center p-4">
      <div className="bg-[#0f0f1a] border border-red-500/40 rounded-2xl p-8 max-w-lg w-full space-y-4">
        <div className="text-center space-y-2">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto" />
          <h2 className="text-white font-bold text-xl">Pause. Read Carefully.</h2>
          <p className="text-gray-300 text-sm">
            Your trading pattern shows high risk. Before continuing,<br />
            type the phrase below to confirm you understand the risk:
          </p>
        </div>

        <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-200 font-semibold text-center italic text-sm">"{requiredPhrase}"</p>
        </div>

        <div>
          <input
            type="text"
            placeholder="Type the exact phrase above..."
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
          />
          {isMatch && <p className="text-emerald-400 text-xs mt-1">✓ Phrase matched!</p>}
        </div>

        <button
          onClick={() => { setUnlocked(true); setOpen(false); }}
          disabled={!isMatch}
          className="w-full py-3 bg-red-600 hover:bg-red-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
        >
          {isMatch ? "I Understand the Risk — Continue" : "Type the phrase to continue"}
        </button>

        <p className="text-center text-[10px] text-gray-600">
          🛡️ This pause protects you from emotional trading decisions.
        </p>
      </div>
    </div>
  );
}
