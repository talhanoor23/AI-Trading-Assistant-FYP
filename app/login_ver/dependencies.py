from fastapi import Depends, HTTPException, status
from models.m_user import User
from oauth2 import get_current_user

def require_role(required_role: str):
    def _role_dependency(user: User = Depends(get_current_user)):
        if user.role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"{required_role} access only"
            )
        return user
    return _role_dependency

get_customer = require_role("customer")
get_store = require_role("store_owner")
get_driver = require_role("driver")
get_admin = require_role("admin")
