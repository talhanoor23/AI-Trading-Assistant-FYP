from langchain_core.messages import HumanMessage

# IMPORT YOUR EXISTING LANGGRAPH APP HERE
# Example:
# from my_langgraph_app import app
from lang.langgraph_agent import app

# For clarity, we assume:
# app = LangGraph supervisor (already built by you)

def run_supervisor(user_message: str):
    """
    Single-responsibility function:
    - Takes raw user text
    - Calls LangGraph supervisor
    - Returns final text response
    """

    result = app.invoke({
        "messages": [
            HumanMessage(content=user_message)
        ]
    })

    # Final answer always comes from supervisor
    return result["messages"][-1].content
