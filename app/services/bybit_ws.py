import websocket
import json

class BybitWS:
    def __init__(self, on_data_callback):
        self.on_data_callback = on_data_callback
        self.ws = None

    def on_message(self, ws, message):
        data = json.loads(message)

        if "data" not in data:
            return

        for k in data["data"]:
            if not k.get("confirm", False):
                continue

            candle = {
                "close": float(k["close"]),
                "high": float(k["high"]),
                "low": float(k["low"]),
                "volume": float(k["volume"]),
            }

            self.on_data_callback(candle)

    def start(self):
        socket = "wss://stream.bybit.com/v5/public/linear"

        def on_open(ws):
            ws.send(json.dumps({
                "op": "subscribe",
                "args": ["kline.1.BTCUSDT"]
            }))

        self.ws = websocket.WebSocketApp(
            socket,
            on_message=self.on_message,
            on_open=on_open
        )

        self.ws.run_forever()