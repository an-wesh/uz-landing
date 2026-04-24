"use client";
import { useState, useRef } from "react";
import { api } from "@/lib/api";
import { Upload, Eye, Loader } from "lucide-react";

interface Props { onInsight: (insight: string) => void; }

export function ChartAnalyzer({ onInsight }: Props) {
  const [analyzing, setAnalyzing] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setAnalyzing(true);
    try {
      const result = await api.analyzeChart(file);
      setInsight(result.insight);
      onInsight(result.insight);
    } catch (e) {
      setInsight("Chart analysis unavailable. Please review manually.");
    } finally {
      setAnalyzing(false);
    }
  }

  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Eye className="w-4 h-4 text-blue-400" />
        <span className="text-sm font-semibold text-white">CHART ANALYZER</span>
        <span className="text-[10px] text-gray-500 ml-auto">Gemma 4 Vision · local</span>
      </div>

      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />

      <button
        onClick={() => inputRef.current?.click()}
        disabled={analyzing}
        className="w-full py-3 border border-dashed border-blue-500/30 rounded-lg
          hover:bg-blue-950/20 transition-colors flex items-center justify-center gap-2"
      >
        {analyzing ? (
          <><Loader className="w-4 h-4 text-blue-400 animate-spin" /><span className="text-xs text-blue-300">Gemma analyzing chart...</span></>
        ) : (
          <><Upload className="w-4 h-4 text-blue-400" /><span className="text-xs text-blue-300">Upload chart screenshot for AI analysis</span></>
        )}
      </button>

      {insight && (
        <div className="bg-blue-950/20 border border-blue-500/20 rounded-lg p-3">
          <p className="text-[10px] text-blue-400 uppercase tracking-wider mb-1">Gemma 4 Vision Insight</p>
          <p className="text-xs text-blue-200 leading-relaxed">{insight}</p>
        </div>
      )}
    </div>
  );
}
