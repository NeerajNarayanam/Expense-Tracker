from fastapi import APIRouter, Header, HTTPException
from jose import jwt, JWTError
from bson import ObjectId

from database.connection import income_collection
from models.income_model import Income

router = APIRouter()

SECRET_KEY = "expense_secret_key"

# GET CURRENT USER
def get_current_user(authorization: str):

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Token Missing"
        )

    token = authorization.split(" ")[1]

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )

        return payload["email"]

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )

# ADD INCOME
@router.post("/income")
def add_income(
    income: Income,
    authorization: str = Header(None)
):

    user_email = get_current_user(
        authorization
    )

    income_dict = income.dict()

    income_dict["user_email"] = user_email

    result = income_collection.insert_one(
        income_dict
    )

    return {
        "message": "Income Added",
        "id": str(result.inserted_id)
    }

# GET USER INCOME
@router.get("/income")
def get_income(
    authorization: str = Header(None)
):

    user_email = get_current_user(
        authorization
    )

    income_data = []

    for income in income_collection.find({
        "user_email": user_email
    }):

        income_data.append({
            "_id": str(income["_id"]),
            "title": income["title"],
            "amount": income["amount"]
        })

    return income_data

# DELETE INCOME
@router.delete("/income/{income_id}")
def delete_income(
    income_id: str,
    authorization: str = Header(None)
):

    user_email = get_current_user(
        authorization
    )

    income = income_collection.find_one({
        "_id": ObjectId(income_id)
    })

    if not income:
        raise HTTPException(
            status_code=404,
            detail="Income Not Found"
        )

    if income["user_email"] != user_email:
        raise HTTPException(
            status_code=403,
            detail="Unauthorized"
        )

    income_collection.delete_one({
        "_id": ObjectId(income_id)
    })

    return {
        "message": "Income Deleted"
    }