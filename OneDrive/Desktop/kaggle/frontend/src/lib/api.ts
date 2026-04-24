const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const r = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" }, ...init
  });
  if (!r.ok) throw new Error(`${path}: ${r.status}`);
  return r.json();
}

export const api = {
  health: () => req<{ status: string; demo_mode: boolean }>("http://localhost:8000/health"),
  analyze: () => req<import("@/types").BehavioralAnalysis>("/analyze-behavior", { method: "POST", body: "{}" }),
  getDNA: () => req<import("@/types").BehavioralDNA>("/behavioral-dna"),
  getVows: () => req<{ vows: string[]; language: string }>("/trading-vows"),
  updateVows: (vows: string[], language = "en") =>
    req("/trading-vows", { method: "POST", body: JSON.stringify({ vows, preferred_language: language }) }),
  confirmTrade: (symbol: string, qty: number, price: number) =>
    req<{ order_id: string }>("/confirm-trade", {
      method: "POST", body: JSON.stringify({ symbol, quantity: qty, price, action: "BUY" })
    }),
  analyzeChart: async (file: File) => {
    const fd = new FormData(); fd.append("file", file);
    const r = await fetch(`${BASE}/analyze-chart`, { method: "POST", body: fd });
    return r.json() as Promise<{ insight: string }>;
  },
  getCrisisResources: (lang = "en") => req<{ helpline: string; message: string; action: string }>(`/crisis-resources?lang=${lang}`),
};
