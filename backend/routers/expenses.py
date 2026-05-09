from fastapi import APIRouter, Header, HTTPException
from bson import ObjectId
from jose import jwt, JWTError

from database.connection import expense_collection
from models.expense_model import Expense

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

# ADD EXPENSE
@router.post("/expenses")
def add_expense(
    expense: Expense,
    authorization: str = Header(None)
):

    user_email = get_current_user(
        authorization
    )

    expense_dict = expense.dict()

    expense_dict["user_email"] = user_email

    result = expense_collection.insert_one(
        expense_dict
    )

    return {
        "message": "Expense Added",
        "id": str(result.inserted_id)
    }

# GET USER EXPENSES
@router.get("/expenses")
def get_expenses(
    authorization: str = Header(None)
):

    user_email = get_current_user(
        authorization
    )

    expenses = []

    for expense in expense_collection.find({
        "user_email": user_email
    }):

        expenses.append({
            "_id": str(expense["_id"]),
            "title": expense["title"],
            "amount": expense["amount"],
            "category": expense["category"]
        })

    return expenses

# DELETE EXPENSE
@router.delete("/expenses/{expense_id}")
def delete_expense(
    expense_id: str,
    authorization: str = Header(None)
):

    user_email = get_current_user(
        authorization
    )

    expense = expense_collection.find_one({
        "_id": ObjectId(expense_id)
    })

    if not expense:
        raise HTTPException(
            status_code=404,
            detail="Expense Not Found"
        )

    if expense["user_email"] != user_email:
        raise HTTPException(
            status_code=403,
            detail="Unauthorized"
        )

    expense_collection.delete_one({
        "_id": ObjectId(expense_id)
    })

    return {
        "message": "Expense Deleted"
    }