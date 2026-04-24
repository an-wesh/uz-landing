"use client";
import { useState } from "react";
import { ChevronDown, ChevronRight, Brain } from "lucide-react";

interface Props { log: string | null; inferenceTime?: number; }

export function ThinkingLog({ log, inferenceTime }: Props) {
  const [open, setOpen] = useState(false);
  if (!log) return null;

  const lines = log.split("\n").filter(Boolean);

  return (
    <div className="bg-gray-950/50 border border-gray-700/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-900/50 transition-colors"
      >
        <Brain className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-semibold text-amber-300">GEMMA THINKING LOG</span>
        <span className="text-[10px] text-gray-500 ml-auto">
          {inferenceTime ? `${inferenceTime.toFixed(1)}s · ` : ""}gemma-4-e4b · local · no data sent
        </span>
        {open ? <ChevronDown className="w-3 h-3 text-gray-500" /> : <ChevronRight className="w-3 h-3 text-gray-500" />}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-1 max-h-64 overflow-y-auto">
          {lines.map((line, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-amber-600 text-[10px] font-mono shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-[11px] text-gray-400 font-mono leading-relaxed">{line}</p>
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-gray-800">
            <p className="text-[10px] text-gray-600 text-center">
              🔒 This reasoning happened entirely on your device — no cloud, no surveillance
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
