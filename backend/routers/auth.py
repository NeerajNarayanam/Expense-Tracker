from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from database import user_collection

from passlib.context import CryptContext

from jose import jwt

SECRET_KEY = "mysecretkey"

router = APIRouter()

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# USER MODEL
class User(BaseModel):
    username: str
    email: str
    password: str

# LOGIN MODEL
class LoginData(BaseModel):
    email: str
    password: str

# REGISTER
@router.post("/register")
async def register(user: User):

    existing_user = await user_collection.find_one({
        "email": user.email
    })

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    hashed_password = pwd_context.hash(
        user.password
    )

    user_data = {
        "username": user.username,
        "email": user.email,
        "password": hashed_password
    }

    await user_collection.insert_one(
        user_data
    )

    return {
        "message": "User registered successfully"
    }

# LOGIN
@router.post("/login")
async def login(data: LoginData):

    user = await user_collection.find_one({
        "email": data.email
    })

    if not user:

        raise HTTPException(
            status_code=400,
            detail="Invalid email"
        )

    valid_password = pwd_context.verify(
        data.password,
        user["password"]
    )

    if not valid_password:

        raise HTTPException(
            status_code=400,
            detail="Invalid password"
        )

    token = jwt.encode(
        {
            "email": user["email"]
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    return {
        "token": token,
        "username": user["username"]
    }