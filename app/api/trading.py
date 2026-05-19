from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import threading
import asyncio

from bot.trading_bot import TradingBot
from services.bybit_ws import BybitWS

router = APIRouter(prefix="/trading", tags=["Trading"])

bot = TradingBot()
clients = []
running = False


# =====================
# WEBSOCKET (FRONTEND)
# =====================
@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)

    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        clients.remove(websocket)


# =====================
# BROADCAST
# =====================
async def broadcast(data):
    for client in clients:
        try:
            await client.send_json(data)
        except:
            clients.remove(client)


# =====================
# CALLBACK FROM BYBIT
# =====================
def handle_candle(candle):
    result = bot.update(candle)

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(broadcast(result))


# =====================
# START / STOP APIs
# =====================
@router.post("/start")
def start_trading():
    global running

    if running:
        return {"status": "already running"}

    running = True

    def run_ws():
        ws = BybitWS(handle_candle)
        ws.start()

    thread = threading.Thread(target=run_ws)
    thread.daemon = True
    thread.start()

    return {"status": "started"}


@router.post("/stop")
def stop_trading():
    global running
    running = False
    return {"status": "stopped"}


@router.get("/status")
def get_status():
    return {"running": running}