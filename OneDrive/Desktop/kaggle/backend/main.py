import os, time
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import base64

load_dotenv()
from models import TradingContext, BehavioralAnalysis, TradeRequest, VowsUpdate, Language
from broker_client import get_trading_context
from ai_engine import analyze_behavior, get_demo_analysis
from behavioral_dna import get_behavioral_dna, save_session, get_historical_context
from multimodal_engine import analyze_chart_image
from rag_engine import retrieve_sebi_context
from crisis_protocol import get_crisis_resources, should_trigger_crisis

DEMO_MODE = os.getenv("DEMO_MODE", "true").lower() == "true"
user_vows: list[str] = [
    "I will stop trading after 2 consecutive losses",
    "I will not use more than 50% of my margin",
    "I will not revenge trade after a big loss",
]
preferred_language = Language.EN

@asynccontextmanager
async def lifespan(app: FastAPI):
    print(f"\n🛡️  Finsight OS — Behavioral Guardian for India's Retail Traders")
    print(f"   Mode: {'DEMO (High-Risk Mock)' if DEMO_MODE else 'LIVE (Zerodha Kite)'}")
    print(f"   AI:   gemma-4-e4b via Ollama (local, private)")
    print(f"   RAG:  Initializing SEBI circular index...")
    from rag_engine import get_collection
    get_collection()
    print(f"   RAG:  ✅ SEBI circulars indexed")
    yield

app = FastAPI(title="Finsight OS API", version="2.0.0", lifespan=lifespan)

app.add_middleware(CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"])


@app.get("/health")
async def health():
    return {"status": "ok", "demo_mode": DEMO_MODE, "model": "gemma4:e4b", "edge_ai": True}


@app.post("/analyze-behavior", response_model=BehavioralAnalysis)
async def analyze(context: TradingContext | None = None):
    # In DEMO_MODE, return demo analysis immediately (skip Ollama call)
    if DEMO_MODE:
        result = get_demo_analysis()
        sebi_ctx, sebi_source = retrieve_sebi_context(
            "retail F&O trading losses financial distress"
        )
        result.sebi_disclosure = sebi_ctx[:200]
        result.sebi_source = sebi_source
        session_id = f"S{int(time.time())}"
        ctx = context or get_trading_context()
        save_session(session_id, result,
                     len(ctx.recent_trades), ctx.margin.usage_ratio * 100)
        return result
    
    ctx = context or get_trading_context()
    ctx.trading_vows = user_vows
    ctx.preferred_language = preferred_language

    # Enrich with historical context
    hist_sessions, hist_loss_rate = get_historical_context()
    ctx.historical_sessions = hist_sessions
    ctx.historical_loss_rate = hist_loss_rate

    # Enrich SEBI disclosure via RAG
    sebi_ctx, sebi_source = retrieve_sebi_context(
        f"retail F&O trading {len([t for t in ctx.recent_trades if t.is_loss])} losses margin {ctx.margin.usage_ratio*100:.0f}%"
    )

    try:
        result = await analyze_behavior(ctx)
    except Exception as e:
        print(f"[ERROR] Gemma offline: {e}")
        result = get_demo_analysis() if DEMO_MODE else None
        if not result:
            raise HTTPException(503, f"AI unavailable: {e}")

    # Override SEBI disclosure with RAG-grounded version
    result.sebi_disclosure = sebi_ctx[:200]
    result.sebi_source = sebi_source

    # Persist to Behavioral DNA
    session_id = f"S{int(time.time())}"
    save_session(session_id, result,
                 len(ctx.recent_trades), ctx.margin.usage_ratio * 100)

    # Crisis protocol check
    if should_trigger_crisis(result.crisis_score, result.behavioral_score, hist_loss_rate):
        result.crisis_detected = True

    return result


@app.get("/behavioral-dna")
async def get_dna():
    return get_behavioral_dna()


@app.post("/analyze-chart")
async def analyze_chart(file: UploadFile = File(...)):
    """Gemma 4 multimodal: analyze uploaded trading chart screenshot."""
    contents = await file.read()
    b64 = base64.b64encode(contents).decode()
    insight = await analyze_chart_image(b64, symbol=file.filename or "")
    return {"insight": insight}


@app.post("/trading-vows")
async def update_vows(update: VowsUpdate):
    global user_vows, preferred_language
    user_vows = update.vows
    preferred_language = update.preferred_language
    return {"status": "saved", "count": len(user_vows)}

@app.get("/trading-vows")
async def get_vows():
    return {"vows": user_vows, "language": preferred_language}

@app.get("/crisis-resources")
async def crisis_resources(lang: str = "en"):
    return get_crisis_resources(lang)

@app.post("/confirm-trade")
async def confirm_trade(trade: TradeRequest):
    print(f"[TRADE ✅] {trade.action} {trade.quantity}x {trade.symbol} @ ₹{trade.price}")
    return {"status": "confirmed", "order_id": f"ORD{int(time.time())}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
