import numpy as np
from talib import abstract

class TradingBot:
    def __init__(self, amount=1000):
        self.amount = amount
        self.amount_left = amount
        self.portfolio = 0

        self.closes = []
        self.highs = []
        self.lows = []
        self.volumes = []

        self.cdl_patterns = [f for f in dir(abstract) if f.startswith("CDL")]

    def buy(self, amount, price):
        self.amount_left -= amount
        self.portfolio += amount / price

    def sell(self, amount, price):
        self.amount_left += amount
        self.portfolio -= amount / price

    def update(self, candle):
        price = candle["close"]

        self.closes.append(candle["close"])
        self.highs.append(candle["high"])
        self.lows.append(candle["low"])
        self.volumes.append(candle["volume"])

        if len(self.closes) < 5:
            return {"status": "waiting"}

        inputs = {
            "open": np.array(self.closes),
            "high": np.array(self.highs),
            "low": np.array(self.lows),
            "close": np.array(self.closes),
            "volume": np.array(self.volumes),
        }

        indicators = []
        for method in self.cdl_patterns:
            val = getattr(abstract, method)(inputs)
            indicators.append(val[-1])

        avg = np.mean(indicators)

        action = "HOLD"
        if avg > 10:
            self.buy(50, price)
            action = "BUY"
        elif avg < -10:
            self.sell(50, price)
            action = "SELL"

        total = self.amount_left + self.portfolio * price

        return {
            "price": price,
            "action": action,
            "avg_indicator": float(avg),
            "total_value": float(total)
        }