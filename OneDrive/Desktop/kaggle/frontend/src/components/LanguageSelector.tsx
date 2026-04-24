"use client";
import type { Language } from "@/types";

const LANGS: { code: Language; label: string; native: string }[] = [
  { code: "en", label: "English", native: "EN" },
  { code: "hi", label: "Hindi", native: "हि" },
  { code: "te", label: "Telugu", native: "తె" },
  { code: "ta", label: "Tamil",  native: "த" },
];

interface Props { selected: Language; onChange: (l: Language) => void; }

export function LanguageSelector({ selected, onChange }: Props) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-[10px] text-gray-500 mr-1">Language:</span>
      {LANGS.map(l => (
        <button key={l.code} onClick={() => onChange(l.code)}
          className={`px-2 py-1 rounded text-[11px] font-medium transition-all
            ${selected === l.code
              ? "bg-purple-600/40 border border-purple-500/50 text-purple-200"
              : "text-gray-500 hover:text-gray-300 hover:bg-gray-800"
            }`}>
          {l.native}
        </button>
      ))}
    </div>
  );
}
