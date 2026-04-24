"use client";
import type { BehavioralAnalysis } from "@/types";
import { Bell } from "lucide-react";

interface Props { analysis: BehavioralAnalysis | null; }

export function NudgeEngine({ analysis }: Props) {
  if (!analysis || !analysis.nudge_message || analysis.risk_level !== "high") return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-red-900/20 to-orange-900/20 border-b border-red-500/30 px-4 py-3 flex items-center gap-3">
      <Bell className="w-5 h-5 text-orange-400 shrink-0 animate-pulse" />
      <div className="flex-1">
        <p className="text-xs font-semibold text-orange-200">⚠️ High Risk Detected</p>
        <p className="text-sm text-gray-200 mt-0.5">{analysis.nudge_message}</p>
      </div>
    </div>
  );
}
