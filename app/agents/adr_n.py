import requests
import pandas as pd
from datetime import datetime, timedelta

def fetch_ohlc_(symbol: str):
    """
    Fetch last 7 completed daily candles (yesterday backwards)
    """

    API_KEY = "c892c9b4a3464b2689f46732c5bfbdc5"

    end_date = datetime.utcnow().date() - timedelta(days=1)
    start_date = end_date - timedelta(days=7)

    url = (
        "https://api.twelvedata.com/time_series"
        f"?symbol={symbol}"
        "&interval=1day"
        f"&start_date={start_date}"
        f"&end_date={end_date}"
        "&order=ASC"
        f"&apikey={API_KEY}"
    )

    data = requests.get(url).json()

    if "values" not in data:
        raise ValueError(data.get("message", "Unknown error from TwelveData"))

    df = pd.DataFrame(data["values"])
    df["datetime"] = pd.to_datetime(df["datetime"])
    df = df.sort_values("datetime").reset_index(drop=True)

    for col in ["open", "high", "low", "close"]:
        df[col] = pd.to_numeric(df[col])

    return df

import pandas_ta as ta

def adr_and_trade_quality(symbol: str):
    """
    Uses last 7 completed daily candles to calculate ADR
    """

    df = fetch_ohlc_(symbol)

    # Safety check
    if len(df) < 5:
        raise ValueError("Not enough data to calculate ADR")

    # True Range (your original method)
    df["TR"] = ta.true_range(df["high"], df["low"], df["close"])

    # ADRs
    df["ADR_5"] = df["TR"].rolling(5).mean()
    df["ADR_3"] = df["TR"].rolling(3).mean()

    adr_1 = df["TR"].iloc[-1]
    adr_5 = df["ADR_5"].iloc[-2]
    adr_3 = df["ADR_3"].iloc[-2]

    ratio_5 = adr_1 / adr_5
    ratio_3 = adr_1 / adr_3

    # Trade-day logic
    if ratio_5 > 1 and ratio_3 > 1:
        trade_quality = "Not good day for trade"
    elif (ratio_5 > 1 and ratio_3 < 1) or (ratio_5 < 1 and ratio_3 > 1):
        trade_quality = "Averaged day"
    else:
        trade_quality = "Best day for trade"

    return {
        "adr_1": round(adr_1, 4),
        "adr_5": round(adr_5, 4),
        "adr_3": round(adr_3, 4),
        "trade_quality": trade_quality
    }