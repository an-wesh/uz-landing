"use client";
import { Heart, Phone, X } from "lucide-react";

interface Props {
  crisisScore: number;
  crisisDetected: boolean;
  language?: string;
  onDismiss: () => void;
}

export function CrisisSupport({ crisisScore, crisisDetected, language = "en", onDismiss }: Props) {
  if (!crisisDetected) return null;

  const resources = language === "hi" ? {
    message: "व्यापारिक नुकसान वास्तविक दर्द का कारण बनता है। आप अकेले नहीं हैं।",
    action: "आज ट्रेडिंग से दूरी बनाएं। आपका जीवन और परिवार किसी भी ट्रेड से ज़्यादा महत्वपूर्ण है।",
    helpline: "iCall: 9152987821",
  } : {
    message: "Trading losses cause real emotional pain. You are not alone.",
    action: "Step away from trading today. Your life and family matter more than any trade.",
    helpline: "iCall: 9152987821 (Mon-Sat, 8am-10pm)",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4">
      <div className="bg-[#0f0f1a] border border-rose-500/40 rounded-2xl p-6 max-w-md w-full space-y-4">
        <button onClick={onDismiss} className="absolute top-4 right-4 text-gray-500 hover:text-white">
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-2">
          <Heart className="w-10 h-10 text-rose-400 mx-auto" />
          <h2 className="text-white font-bold text-lg">Finsight Cares</h2>
          <p className="text-gray-300 text-sm">{resources.message}</p>
        </div>

        <div className="bg-rose-950/30 border border-rose-500/20 rounded-xl p-4 space-y-2">
          <p className="text-rose-200 text-sm font-medium">{resources.action}</p>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 flex items-center gap-3">
          <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Free mental health support</p>
            <p className="text-white font-bold">{resources.helpline}</p>
          </div>
        </div>

        <p className="text-center text-[10px] text-gray-600">
          Finsight OS detected distress signals in your trading pattern. This message was generated locally.
        </p>

        <button onClick={onDismiss}
          className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-medium text-sm">
          I'll take a break today
        </button>
      </div>
    </div>
  );
}
