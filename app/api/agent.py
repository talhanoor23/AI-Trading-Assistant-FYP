from fastapi import APIRouter
from schemas.agent import AgentRequest, AgentResponse, SwingCSVRequest, ADRRequest, ADRResponse
from agents.supervisor import run_supervisor

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from db.session import get_db
from login_ver.oauth2 import get_current_user
from models import user

from fastapi import APIRouter, HTTPException


router = APIRouter(prefix="/agent", tags=["Agent"])


@router.post("/chat", response_model=AgentResponse, )
async def chat_with_agent(request: AgentRequest, current_user=Depends(get_current_user)):
    
    """
    Core agent endpoint:
    - Receives user input
    - Calls supervisor
    - Returns final response
    """

    messages = run_supervisor(request.message)  # returns list
    last_message = messages[-1]  # get last message

    # Convert to string if it's not already
    if hasattr(last_message, "content"):  # LangChain / LangGraph messages
        reply_text = last_message.content
    elif isinstance(last_message, dict) and "text" in last_message:
        reply_text = last_message["text"]
    else:
        reply_text = str(last_message)

    return AgentResponse(reply=reply_text)


import io
from fastapi.responses import StreamingResponse
from agents.swing import generate_swing_df

@router.post("/swing_csv")
def download_swing_csv(payload: SwingCSVRequest, current_user=Depends(get_current_user)):
    df = generate_swing_df(
        symbol=payload.symbol,
        interval=payload.interval,
        start_date=payload.start_date,
        end_date=payload.end_date,
        lookback=payload.lookback
    )

    # Convert DataFrame → CSV in memory
    buffer = io.StringIO()
    df.to_csv(buffer, index=False)
    buffer.seek(0)

    safe_symbol = payload.symbol.replace("/", "")
    filename = f"{safe_symbol}_{payload.interval}_{payload.start_date}_to_{payload.end_date}_swings.csv"

    return StreamingResponse(
        buffer,
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename={filename}"
        }
    )




from agents.adr_n import adr_and_trade_quality

@router.post("/adr_analyze", response_model=ADRResponse)
def analyze_adr(payload: ADRRequest, current_user=Depends(get_current_user)):
    try:
        return adr_and_trade_quality(payload.symbol)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
