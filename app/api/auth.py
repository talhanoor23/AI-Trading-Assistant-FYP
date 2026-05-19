from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.session import get_db
from schemas.user import UserCreate, UserRead, UserLogin
from models.user import User
from passlib.context import CryptContext
from login_ver.oauth2 import create_access_token
from schemas import s_token

router = APIRouter(tags=["Auth"])

# Use bcrypt_sha256 to avoid 72-byte limit issues with bcrypt
pwd_context = CryptContext(
    schemes=["bcrypt_sha256"],
    deprecated="auto"
)

MAX_PASSWORD_BYTES = 72  # safety limit for bcrypt

def hash_password(password: str) -> str:
    # Truncate password safely to avoid bcrypt errors
    truncated_pw = password[:MAX_PASSWORD_BYTES]
    return pwd_context.hash(truncated_pw)


@router.post("/register", response_model=UserRead)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash password safely
    hashed_pw = hash_password(user_in.password)

    new_user = User(
        name=user_in.name,
        email=user_in.email,
        hashed_password=hashed_pw
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.post("/login", response_model=s_token.Token)
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data.email).first()

    if not user or not pwd_context.verify(
        user_data.password[:MAX_PASSWORD_BYTES],  # truncate on verify too
        user.hashed_password
    ):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"user_id": user.id})

    return {
        "access_token": token,
        "token_type": "bearer"
    }