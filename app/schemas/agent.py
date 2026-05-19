from pydantic import BaseModel, Field
from typing import Optional


class AgentRequest(BaseModel):
    message: str
    session_id: Optional[str] = None  # for future memory


class AgentResponse(BaseModel):
    reply: str



class SwingCSVRequest(BaseModel):
    symbol: str = Field(example="BTC/USDT")
    interval: str = Field(example="1h")
    start_date: str = Field(example="2024-01-01")
    end_date: str = Field(example="2024-02-01")
    lookback: int = Field(example=3, ge=1)



class ADRRequest(BaseModel):
    symbol: str = Field(example="BTC/USD")

class ADRResponse(BaseModel):
    adr_1: float
    adr_5: float
    adr_3: float
    trade_quality: str
