from fastapi import APIRouter
from database import income_collection
from bson import ObjectId

router = APIRouter()

# GET ALL INCOME
@router.get("/income")
async def get_income():

    income_list = []

    async for income in income_collection.find():

        income["_id"] = str(income["_id"])

        income_list.append(income)

    return income_list


# ADD INCOME
@router.post("/income")
async def add_income(income: dict):

    result = await income_collection.insert_one(
        income
    )

    income["_id"] = str(
        result.inserted_id
    )

    return income


# DELETE INCOME
@router.delete("/income/{income_id}")
async def delete_income(
    income_id: str
):

    await income_collection.delete_one({
        "_id": ObjectId(income_id)
    })

    return {
        "message": "Income Deleted"
    }