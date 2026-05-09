from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from jose import jwt

from database.connection import users_collection
from models.user_model import User

router = APIRouter()

SECRET_KEY = "expense_secret_key"

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# REGISTER
@router.post("/register")
def register(user: User):

    existing_user = users_collection.find_one({
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

    user_dict = {
        "username": user.username,
        "email": user.email,
        "password": hashed_password
    }

    users_collection.insert_one(user_dict)

    return {
        "message": "User Registered Successfully"
    }

# LOGIN
@router.post("/login")
def login(data: dict):

    email = data.get("email")
    password = data.get("password")

    existing_user = users_collection.find_one({
        "email": email
    })

    if not existing_user:
        raise HTTPException(
            status_code=400,
            detail="Invalid Email"
        )

    password_correct = pwd_context.verify(
        password,
        existing_user["password"]
    )

    if not password_correct:
        raise HTTPException(
            status_code=400,
            detail="Invalid Password"
        )

    token = jwt.encode(
        {
            "email": existing_user["email"]
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    return {
        "token": token,
        "username": existing_user["username"]
    }