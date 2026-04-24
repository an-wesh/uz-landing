"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { CheckCircle2, Plus, X } from "lucide-react";

export function TradingVows() {
  const [vows, setVows] = useState([
    "I will stop trading after 2 consecutive losses",
    "I will not use more than 50% of my margin",
    "I will not revenge trade after a big loss",
  ]);
  const [newVow, setNewVow] = useState("");
  const [editing, setEditing] = useState(false);

  const handleAddVow = async () => {
    if (!newVow.trim()) return;
    const updated = [...vows, newVow];
    setVows(updated);
    setNewVow("");
    await api.updateVows(updated);
  };

  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-purple-400" />
        <span className="text-sm font-semibold text-white">TRADING VOWS</span>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {vows.map((vow, i) => (
          <div key={i} className="flex items-start gap-2 bg-black/20 rounded-lg p-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
            <p className="text-xs text-gray-300 flex-1">{vow}</p>
            {editing && (
              <button onClick={() => setVows(vows.filter((_, j) => j !== i))} className="text-gray-500 hover:text-red-400">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      {editing && (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a new vow..."
            value={newVow}
            onChange={(e) => setNewVow(e.target.value)}
            className="flex-1 px-2 py-1 bg-gray-900 border border-gray-700 rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
          />
          <button onClick={handleAddVow} className="p-1 bg-purple-600 hover:bg-purple-500 rounded-lg">
            <Plus className="w-3 h-3 text-white" />
          </button>
        </div>
      )}

      <button onClick={() => setEditing(!editing)}
        className="w-full py-2 text-xs font-medium bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg transition-colors">
        {editing ? "Done Editing" : "Edit Vows"}
      </button>
    </div>
  );
}
