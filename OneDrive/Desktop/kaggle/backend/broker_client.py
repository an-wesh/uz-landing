"""
broker_client.py — Mock trading context generator for demo mode.
In production, this would connect to Zerodha Kite API.
"""

from datetime import datetime, timedelta
from models import TradingContext, MarginData, Trade, Language


def get_trading_context() -> TradingContext:
    """
    Returns a demo trading context with recent trades and margin data.
    In DEMO_MODE, this simulates a high-risk scenario.
    """
    
    now = datetime.now()
    
    # Simulate 4 consecutive losses (revenge trading scenario)
    demo_trades = [
        Trade(
            trade_id="T001",
            symbol="NIFTY24DEC22000CE",
            action="BUY",
            quantity=50,
            price=120.0,
            timestamp=now - timedelta(minutes=30),
            pnl=-3200,
            is_loss=True,
        ),
        Trade(
            trade_id="T002",
            symbol="RELIANCE",
            action="BUY",
            quantity=10,
            price=2890.0,
            timestamp=now - timedelta(minutes=22),
            pnl=-1450,
            is_loss=True,
        ),
        Trade(
            trade_id="T003",
            symbol="BANKNIFTY24DEC47000PE",
            action="BUY",
            quantity=25,
            price=164.0,
            timestamp=now - timedelta(minutes=12),
            pnl=-4100,
            is_loss=True,
        ),
        Trade(
            trade_id="T004",
            symbol="INFY",
            action="BUY",
            quantity=15,
            price=1540.0,
            timestamp=now - timedelta(minutes=5),
            pnl=-890,
            is_loss=True,
        ),
    ]
    
    # High margin usage (85%)
    demo_margin = MarginData(
        available=15000.0,
        used=85000.0,
        total=100000.0,
    )
    
    return TradingContext(
        recent_trades=demo_trades,
        margin=demo_margin,
        trading_vows=[
            "I will stop trading after 2 consecutive losses",
            "I will not use more than 50% of my margin",
            "I will not revenge trade after a big loss",
        ],
        session_start=now - timedelta(minutes=40),
        preferred_language=Language.EN,
        historical_sessions=0,
        historical_loss_rate=0.0,
    )
