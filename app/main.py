# # fastapi dev main.py
# # python -m uvicorn main:app --reload
# taskkill /F /IM ngrok.exe
# ngrok http 8000

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# from api.agent import router as agent_router
# from api.auth import router as auth_router

# from db.session import engine
# from models.user import Base

# # Create all tables
# Base.metadata.create_all(bind=engine)

# app = FastAPI(
#     title="Agentic AI Backend",
#     version="0.1.0"
# )


# # ✅ CORS middleware (allows frontend to talk to backend)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],   # OK for development
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(agent_router)
# app.include_router(auth_router)


# @app.get("/")
# def health_check():
#     return {"status": "ok"}



# --------------------------------------------------------------------------


from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from dotenv import load_dotenv

from api.agent import router as agent_router
from api.auth import router as auth_router
from api.trading import router as trading_router
from agents.supervisor import run_supervisor

from db.session import engine
from models.user import Base

# from services.agent_client import get_agent_reply   # 👈 NEW (important)

# ----------------------------
# INIT
# ----------------------------

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Agentic AI Backend",
    version="0.1.0"
)

# ----------------------------
# CORS
# ----------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# ROUTERS
# ----------------------------

app.include_router(agent_router)
app.include_router(auth_router)
app.include_router(trading_router)

# ----------------------------
# ENV
# ----------------------------

ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
PHONE_NUMBER_ID = os.getenv("PHONE_NUMBER_ID")
VERIFY_TOKEN = os.getenv("VERIFY_TOKEN")

# ----------------------------
# HEALTH CHECK
# ----------------------------

@app.get("/")
def health_check():
    return {"status": "ok"}

# ----------------------------
# WEBHOOK VERIFY (META)
# ----------------------------

@app.get("/webhook")
async def verify(request: Request):
    params = request.query_params

    if (
        params.get("hub.mode") == "subscribe"
        and params.get("hub.verify_token") == VERIFY_TOKEN
    ):
        return int(params.get("hub.challenge"))

    return {"error": "Verification failed"}

# ----------------------------
# WEBHOOK RECEIVE MESSAGE
# ----------------------------
import asyncio
processed_messages = set()
@app.post("/webhook")
async def webhook(request: Request):
    body = await request.json()

    asyncio.create_task(handle_message(body))  # background

    return {"status": "ok"}  # instant response

async def handle_message(body):
    value = body["entry"][0]["changes"][0]["value"]

    if "messages" not in value:
        return

    message = value["messages"][0]
    message_id = message["id"]

    # 🚨 Deduplication
    if message_id in processed_messages:
        return

    processed_messages.add(message_id)

    user_number = message["from"]
    user_text = message["text"]["body"]

    # 🧠 Agent call
    messages = run_supervisor(user_text)
    last_message = messages[-1]

    # ✅ Proper extraction (IMPORTANT FIX)
    if hasattr(last_message, "content"):
        ai_reply = last_message.content
    elif isinstance(last_message, dict):
        ai_reply = (
            last_message.get("text")
            or last_message.get("content")
            or str(last_message)
        )
    else:
        ai_reply = str(last_message)

    # 🧼 Final cleanup (removes nested dict printing issue)
    if isinstance(ai_reply, dict):
        ai_reply = ai_reply.get("text") or str(ai_reply)

    send_message(user_number, ai_reply)

# processed_messages = set()
# @app.post("/webhook")
# async def webhook(request: Request):
#     body = await request.json()
#     print("Incoming:", body)

#     try:
#         value = body["entry"][0]["changes"][0]["value"]

#         if "messages" in value:
#             message = value["messages"][0]

#             message_id = message["id"]

#             # 🚨 DUPLICATE CHECK
#             if message_id in processed_messages:
#                 print("Duplicate message skipped")
#                 return {"status": "duplicate"}

#             processed_messages.add(message_id)

#             user_number = message["from"]
#             user_text = message["text"]["body"]

#             print(f"User ({user_number}): {user_text}")

#             # 🤖 agent
#             messages = run_supervisor(user_text)
#             last_message = messages[-1]

#             if hasattr(last_message, "content"):
#                 ai_reply = last_message.content
#             elif isinstance(last_message, dict) and "text" in last_message:
#                 ai_reply = last_message["text"]
#             else:
#                 ai_reply = str(last_message)

#             send_message(user_number, ai_reply)

#         else:
#             print("Skipping non-message event")

#     except Exception as e:
#         print("Error:", e)

#     return {"status": "ok"}


# @app.post("/webhook")
# async def webhook(request: Request):
#     body = await request.json()
#     print("Incoming:", body)

#     try:
#         value = body["entry"][0]["changes"][0]["value"]

#         if "messages" in value:
#             message = value["messages"][0]
#             user_number = message["from"]
#             user_text = message["text"]["body"]

#             print(f"User ({user_number}): {user_text}")

#             # 🤖 DIRECT AGENT CALL (NO HTTP REQUEST)
#             messages = run_supervisor(user_text)
#             last_message = messages[-1]

#             # extract reply
#             if hasattr(last_message, "content"):
#                 ai_reply = last_message.content
#             elif isinstance(last_message, dict) and "text" in last_message:
#                 ai_reply = last_message["text"]
#             else:
#                 ai_reply = str(last_message)

#             send_message(user_number, ai_reply)

#         else:
#             print("Skipping non-message event")

#     except Exception as e:
#         print("Error:", e)

#     return {"status": "ok"}




# ----------------------------
# SEND MESSAGE TO WHATSAPP
# ----------------------------

def send_message(to, text):
    url = f"https://graph.facebook.com/v25.0/{PHONE_NUMBER_ID}/messages"

    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json",
    }

    data = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "text",
        "text": {"body": text},
    }

    response = requests.post(url, headers=headers, json=data)
    print("Send response:", response.text)