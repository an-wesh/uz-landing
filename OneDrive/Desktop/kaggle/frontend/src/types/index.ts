export type RiskLevel = "low" | "medium" | "high";
export type Language = "en" | "hi" | "te" | "ta";

export interface Trade {
  trade_id: string; symbol: string; action: "BUY" | "SELL";
  quantity: number; price: number; timestamp: string;
  pnl: number | null; is_loss: boolean;
}

export interface MarginData {
  available: number; used: number; total: number;
}

export interface BehavioralAnalysis {
  behavioral_score: number;
  risk_level: RiskLevel;
  detected_pattern: string;
  nudge_message: string;
  nudge_message_local: string;
  vows_violated: string[];
  crisis_score: number;
  crisis_detected: boolean;
  sebi_disclosure: string | null;
  sebi_source: string | null;
  thinking_log: string | null;
  chart_insight: string | null;
}

export interface DNASession {
  date: string; score: number; pattern: string;
}

export interface BehavioralDNA {
  total_sessions: number;
  dominant_pattern: string;
  avg_score: number;
  high_risk_rate: number;
  worst_score: number;
  streak_days: number;
  sessions: DNASession[];
}
