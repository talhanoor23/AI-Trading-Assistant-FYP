import requests
import pandas as pd


def fetch_ohlc_data(symbol, interval, start_date, end_date):
    apikey = 'c892c9b4a3464b2689f46732c5bfbdc5'
    url = (
        f"https://api.twelvedata.com/time_series"
        f"?symbol={symbol}"
        f"&interval={interval}"
        f"&start_date={start_date}"
        f"&end_date={end_date}"
        f"&order=ASC"
        f"&apikey={apikey}"
    )

    data = requests.get(url).json()

    if "values" not in data:
        raise ValueError(data.get("message", "Unknown error"))

    df = pd.DataFrame(data["values"])
    df["datetime"] = pd.to_datetime(df["datetime"])
    df = df.sort_values("datetime").reset_index(drop=True)

    for col in ["open", "high", "low", "close"]:
        df[col] = pd.to_numeric(df[col])

    return df

def find_swings(df, lookback=3):
    df = df.copy()
    df["swing_high"] = False
    df["swing_low"] = False

    for i in range(lookback, len(df) - lookback):
        if df["high"].iloc[i] == df["high"].iloc[i - lookback:i + lookback + 1].max():
            df.loc[df.index[i], "swing_high"] = True

        if df["low"].iloc[i] == df["low"].iloc[i - lookback:i + lookback + 1].min():
            df.loc[df.index[i], "swing_low"] = True

    return df

def generate_swing_df(
    symbol: str,
    interval: str,
    start_date: str,
    end_date: str,
    lookback: int
):
    # 1️⃣ Fetch data
    df = fetch_ohlc_data(
        symbol=symbol,
        interval=interval,
        start_date=start_date,
        end_date=end_date
    )

    # 2️⃣ Calculate swings
    df = find_swings(df, lookback)

    return df
