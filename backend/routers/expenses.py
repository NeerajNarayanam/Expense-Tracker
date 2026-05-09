from fastapi import APIRouter
from database import expense_collection
from bson import ObjectId

router = APIRouter()

# GET ALL EXPENSES
@router.get("/expenses")
async def get_expenses():

    expenses = []

    async for expense in expense_collection.find():

        expense["_id"] = str(expense["_id"])

        expenses.append(expense)

    return expenses

# ADD EXPENSE
@router.post("/expenses")
async def add_expense(expense: dict):

    result = await expense_collection.insert_one(expense)

    expense["_id"] = str(result.inserted_id)

    return expense

# DELETE EXPENSE
@router.delete("/expenses/{expense_id}")
async def delete_expense(expense_id: str):

    await expense_collection.delete_one({
        "_id": ObjectId(expense_id)
    })

    return {"message": "Deleted"}

# UPDATE EXPENSE
@router.put("/expenses/{expense_id}")
async def update_expense(
    expense_id: str,
    updated_data: dict
):

    await expense_collection.update_one(
        {"_id": ObjectId(expense_id)},
        {"$set": updated_data}
    )

    return {
        "message": "Expense Updated"
    }