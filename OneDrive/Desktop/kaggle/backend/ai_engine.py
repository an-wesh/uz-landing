"""
ai_engine.py — Gemma 4 behavioral analysis engine.
Features used:
  1. Thinking Mode (<|think|>) — transparent reasoning
  2. Structured JSON output — strict schema
  3. Multi-language generation — Hindi/English/Telugu nudges
  4. Vow-aware analysis — identity contract checking
  5. Crisis detection — financial distress scoring
  6. Historical context — from BehavioralDNA

CPU-optimized for i7-1255U (8 threads, 2048 ctx) — targets <3s.
"""

import os, json, re, time
from models import TradingContext, BehavioralAnalysis

OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "gemma4:e4b")
OLLAMA_HOST  = os.getenv("OLLAMA_HOST",  "http://localhost:11434")

LANG_NAMES = {"en": "English", "hi": "Hindi (Devanagari script)", "te": "Telugu", "ta": "Tamil"}


def build_analysis_prompt(ctx: TradingContext) -> str:
    losses = [t for t in ctx.recent_trades if t.is_loss]
    loss_count = len(losses)
    total_loss = sum(t.pnl for t in losses if t.pnl is not None)
    margin_pct  = round(ctx.margin.usage_ratio * 100, 1)
    lang_name   = LANG_NAMES.get(ctx.preferred_language.value, "English")

    trade_lines = "\n".join(
        f"  [{t.timestamp.strftime('%H:%M')}] {t.action} {t.symbol} "
        f"qty={t.quantity} @ ₹{t.price} PnL=₹{t.pnl or 'N/A'} {'❌LOSS' if t.is_loss else '✓'}"
        for t in ctx.recent_trades
    )
    vow_lines = "\n".join(f"  VOW {i+1}: {v}" for i, v in enumerate(ctx.trading_vows)) or "  None set"

    historical_note = ""
    if ctx.historical_sessions > 0:
        historical_note = f"""
## HISTORICAL BEHAVIORAL RECORD
Past sessions analyzed: {ctx.historical_sessions}
High-risk session rate: {ctx.historical_loss_rate*100:.0f}%
Note: Persistent pattern across multiple sessions INCREASES score."""

    return f"""<|think|>
You are Finsight OS, a privacy-first behavioral guardian for retail investors in India.
Your job is to protect traders from emotional decision-making — especially the 93% who lose money.
Reason carefully before responding.

## CURRENT SESSION DATA
Time: {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M')}
Losses this session: {loss_count} | Total loss P&L: ₹{total_loss:.0f}
Margin used: {margin_pct}% ({margin_pct > 70 and 'DANGER — approaching limit' or 'acceptable'})

## RECENT TRADES (last 5, chronological)
{trade_lines}

## USER'S IDENTITY CONTRACT (Trading Vows)
{vow_lines}
{historical_note}

## YOUR REASONING PROCESS — think step by step:
STEP 1 — VOW CHECK: Go through each vow. Is it violated? Be specific.
STEP 2 — PATTERN: Which best fits? Options:
  - "Revenge Trading": Trading aggressively to recover losses, not following plan
  - "FOMO": Chasing markets out of fear of missing out, overtrading
  - "Over-Leveraging": Using dangerous levels of margin (>70%)
  - "Addiction Loop": Continuing to trade despite 3+ consecutive losses
  - "Panic Selling": Exiting prematurely out of fear
  - "Healthy Trading": Disciplined, within risk limits, following vows
STEP 3 — SCORE (0-1000):
  Base: Start at 0
  +200 if 2+ losses in 60 mins
  +200 if 4+ losses in session
  +150 if margin > 70%
  +200 if ANY vow violated
  +150 if historical high-risk rate > 50%
  -100 if last trade was a win (slight calming)
  Final cap: 1000
STEP 4 — NUDGE (ONLY IF SCORE > 600):
  Write EXACTLY 15 words. First person. Names the SPECIFIC pattern.
  Must be emotionally resonant, not clinical.
  Example: "I am trading to recover losses, not following my plan today."
STEP 5 — LOCAL LANGUAGE NUDGE:
  Translate the nudge message into {lang_name}. Keep it natural.
STEP 6 — CRISIS SCORE (0-100):
  Assess financial distress severity. Consider: total losses, pattern persistence,
  margin exhaustion. >70 triggers crisis protocol.
STEP 7 — SEBI DISCLOSURE: One sentence, cite a real SEBI guideline.
<|/think|>

Respond with ONLY this JSON, no markdown, no explanation:
{{
  "behavioral_score": <0-1000 integer>,
  "risk_level": "<low|medium|high>",
  "detected_pattern": "<exact pattern name>",
  "nudge_message": "<15-word first-person English sentence, or empty if not high>",
  "nudge_message_local": "<same phrase in {lang_name}, or empty if English>",
  "vows_violated": ["<vow text if violated>"],
  "crisis_score": <0-100 integer>,
  "crisis_detected": <true if crisis_score > 70>,
  "sebi_disclosure": "<SEBI-grounded one sentence>"
}}"""


async def analyze_behavior(ctx: TradingContext) -> BehavioralAnalysis:
    import ollama
    prompt = build_analysis_prompt(ctx)

    print("\n" + "="*60)
    print(f"[Finsight AI] Running gemma-4-e4b locally...")
    print("="*60)

    start = time.time()
    response = await ollama.AsyncClient(host=OLLAMA_HOST).generate(
        model=OLLAMA_MODEL,
        prompt=prompt,
        options={
            "temperature": 0.15,
            "num_predict": 600,
            "num_ctx": 2048,
            "num_thread": 8,
        },
    )
    elapsed = time.time() - start
    raw = response["response"]

    print(f"[Finsight AI] ⚡ Inference: {elapsed:.2f}s")

    # Extract thinking log
    think_match = re.search(r"<\|think\|>(.*?)<\|/think\|>", raw, re.DOTALL)
    thinking_log = think_match.group(1).strip() if think_match else ""

    # Extract JSON
    json_match = re.search(r"\{[\s\S]*\}", raw)
    if not json_match:
        raise ValueError(f"No JSON in response: {raw[:300]}")

    data = json.loads(json_match.group())

    # Console log thinking (competition requirement)
    if thinking_log:
        print("\n" + "="*60)
        print("[🧠 GEMMA THINKING LOG — Technical Verification]")
        print("="*60)
        print(thinking_log)
        print("="*60 + "\n")

    return BehavioralAnalysis(
        behavioral_score=int(data["behavioral_score"]),
        risk_level=data["risk_level"],
        detected_pattern=data["detected_pattern"],
        nudge_message=data.get("nudge_message", ""),
        nudge_message_local=data.get("nudge_message_local", ""),
        vows_violated=data.get("vows_violated", []),
        crisis_score=int(data.get("crisis_score", 0)),
        crisis_detected=bool(data.get("crisis_detected", False)),
        sebi_disclosure=data.get("sebi_disclosure"),
        thinking_log=thinking_log,
    )


def get_demo_analysis() -> BehavioralAnalysis:
    """High-risk demo scenario — guaranteed to trigger Speed Bump."""
    return BehavioralAnalysis(
        behavioral_score=892,
        risk_level="high",
        detected_pattern="Revenge Trading",
        nudge_message="I am trading to recover losses, not following my plan today.",
        nudge_message_local="मैं नुकसान वसूलने के लिए ट्रेड कर रहा हूँ, अपनी योजना नहीं मान रहा।",
        vows_violated=["I will stop trading after 2 consecutive losses"],
        crisis_score=62,
        crisis_detected=False,
        sebi_disclosure="SEBI study FY2025: 91% of retail F&O traders incurred losses. Average loss: ₹1.1 lakh per person.",
        thinking_log="[DEMO] 4 losses detected. Margin at 85%. Vow #1 violated (2+ consecutive losses). Pattern: Revenge Trading. Score: 892/1000.",
    )
