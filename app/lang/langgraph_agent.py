from typing import Annotated, Dict, Any
from typing_extensions import TypedDict
from langgraph.graph.message import add_messages
from dotenv import load_dotenv
from keybert import KeyBERT

import os
import requests
from typing import Optional, List, Dict
from datetime import datetime, timedelta, timezone
from langchain.tools import tool
from langchain_core.messages import BaseMessage

import json
from langchain.tools import tool
from langchain_core.messages import HumanMessage
from langchain_core.messages import SystemMessage, AIMessage

from langgraph.graph import StateGraph,START,END
from langgraph.prebuilt import ToolNode
from langgraph.prebuilt import tools_condition

# load .env explicitly from lang folder
# load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "lang/.env"))


load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
NEWS_API_KEY = os.getenv("NEWS_API_KEY")

NEWS_API_URL = "https://newsapi.org/v2/everything"


from langchain_google_genai import ChatGoogleGenerativeAI

llm = ChatGoogleGenerativeAI(
    model="models/gemini-2.5-flash",
    api_key=GOOGLE_API_KEY   # <--- this is required
)



kw_model = KeyBERT(model="all-MiniLM-L6-v2")


class State(TypedDict):
    messages: Annotated[list, add_messages]


def extract_keywords(text: str, top_k: int = 5) -> str:
    keywords = kw_model.extract_keywords(
        text,
        keyphrase_ngram_range=(1, 2),
        stop_words="english",
        top_n=top_k
    )
    return " OR ".join([kw[0] for kw in keywords])


def fetch_financial_news(minutes: int, query: str) -> List[Dict]:
    from_time = (datetime.now(timezone.utc) - timedelta(days=7)).isoformat()

    params = {
        "language": "en",
        "pageSize": 10,
        "from": from_time,
        "q": query,
        "apiKey": os.getenv("NEWS_API_KEY"),
    }

    response = requests.get(NEWS_API_URL, params=params, timeout=10)
    response.raise_for_status()
    return response.json().get("articles", [])

@tool
def financial_news_research(
    minutes: int = 1440,
    user_query: str = "",
    state: Optional[dict] = None
) -> dict:
    """
    Fetch financial news and mark state when done.
    """
    print("🚨 TOOL CALLED")
    if not user_query.strip():
        user_query = "finance market economy stocks"

    keyword_query = extract_keywords(user_query)
    articles = fetch_financial_news(minutes, keyword_query)

    if not articles:
        return {
            "results": [],
            "status": "NO_DATA",
            "message": "No relevant news found"
        }

    # LLM call happens once
    prompt_blocks = []
    valid_articles = []
    for i, a in enumerate(articles, start=1):
        title = a.get("title")
        if not title:
            continue
        valid_articles.append(a)
        description = a.get("description") or ""
        prompt_blocks.append(f"Article {i}\nTitle: {title}\nDescription: {description}\n")

    prompt = f"""
You are a financial market analyst.

For EACH article below, explain in one sentence
why it matters to financial markets.

Return a numbered list matching the article order.

{chr(10).join(prompt_blocks)}
"""
    response = llm.invoke(prompt).content.strip()
    explanations = [
        line.split(".", 1)[-1].strip()
        for line in response.splitlines()
        if line.strip()
    ]

    results = [
        {
            "headline": a.get("title"),
            "why_important": explanations[i] if i < len(explanations) else "No explanation",
            "source": a.get("source", {}).get("name"),
            "published_at": a.get("publishedAt"),
            "url": a.get("url"),
        }
        for i, a in enumerate(valid_articles)
    ]
    return results

REASONING_SCHEMA = {
    "summary": str,
    "sentiment": "bullish | bearish | neutral",
    "confidence": float,  # 0.0 - 1.0
    "key_points": list[str],
    "risks": list[str],
    "time_horizon": "short_term | mid_term | long_term"
}

REASONING_PROMPT = """
You are a financial reasoning agent.

Analyze the user's query and available context.

Return STRICT JSON matching this schema:
{
  "summary": string,
  "sentiment": "bullish" | "bearish" | "neutral",
  "confidence": number (0 to 1),
  "key_points": [string],
  "risks": [string],
  "time_horizon": "short_term" | "mid_term" | "long_term"
}

Rules:
- NO markdown
- NO explanations
- NO extra text
- If uncertain, lower confidence
"""


@tool
def structured_reasoning_tool(user_query: str) -> dict:
    """
    Perform structured financial reasoning on a user query.

    Input:
    - user_query: The user's financial or market-related question.

    Output (JSON):
    {
        "summary": string,
        "sentiment": "bullish" | "bearish" | "neutral",
        "confidence": number (0 to 1),
        "key_points": [string],
        "risks": [string],
        "time_horizon": "short_term" | "mid_term" | "long_term"
    }
    """
    print("🤖 REASONING AGENT CALLED")
    combined_prompt = f"{REASONING_PROMPT}\n\nUser Query: {user_query}"
    response = llm.invoke([
        HumanMessage(content=combined_prompt)
    ])
    print(response.content)

    try:
        return json.loads(response.content)
    except Exception:
        return {
            "summary": "Unable to generate structured reasoning",
            "sentiment": "neutral",
            "confidence": 0.0,
            "key_points": [],
            "risks": ["Parsing failure"],
            "time_horizon": "short_term"
        }

SUPERVISOR_PROMPT = """
You are a financial AI system composed of specialized agents.

Your goal is to provide accurate, well-reasoned, and up-to-date responses.

You have access to:
- A Financial News Agent (real-time information)
- A Reasoning Agent (macro, cause-effect, implications, synthesis)
- Educational knowledge (no tools required)
If reasoning is needed, donot reason it yourself, first call the news the you must have to call the Reasoning Agent

General Principles:
- Do NOT invent facts, news, or events
- If real-time or external data is required, fetch it before reasoning
- If reasoning is required, base it strictly on known facts or fetched data
- Prefer multi-step reasoning over shallow answers
- You may use more than one agent if the user query requires it
- Agents may consume outputs from other agents

Tool & Agent Usage Rules:
- Use tools ONLY when real-time or external information is needed or is required
- Each tool may be called at most ONCE per query
- After a tool returns data, treat it as sufficient
- Do NOT retry or re-call same tools again for the same query
- If information remains incomplete, state uncertainty clearly

Decision Logic:
1. Determine if the query requires real-time data
   - If yes → call Financial News Agent
2. Determine if the query requires implications, interpretation, or synthesis
   - If yes → call Financial News Agent for News then call Reasoning Agent (using available data)
3. If neither is required → answer directly

Output:
- Provide a coherent final answer to the user
- Do not expose internal routing or agent decisions
- Do not mention tools unless explicitly asked
"""


tools=[
        financial_news_research,
        structured_reasoning_tool
    ]
llm_with_tools = llm.bind_tools(tools)



def supervisor_node(state: State):
    print("🧠 SUPERVISOR CALLED")

    messages = state["messages"]
    if not messages:
        messages = [SystemMessage(content=SUPERVISOR_PROMPT)]

    # 2️⃣ Ensure system prompt
    if not messages or not isinstance(messages[0], SystemMessage):
        messages = [SystemMessage(content=SUPERVISOR_PROMPT)] + messages

    # 3️⃣ Call LLM (routing / tool decision)
    response = llm_with_tools.invoke(messages)

    # 5️⃣ Otherwise allow tool execution
    return {
        "messages": messages + [response]
    }



graph = StateGraph(State)

graph.add_node("respond", supervisor_node)
graph.add_node("tools",ToolNode(tools))

graph.set_entry_point("respond")

graph.add_conditional_edges(
    "respond",
    tools_condition
)
graph.add_edge("tools","respond")
graph.add_edge("respond", END)

app = graph.compile()


