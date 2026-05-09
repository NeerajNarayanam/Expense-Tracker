import os

from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["expense_tracker"]

expense_collection = db["expenses"]
income_collection = db["income"]
users_collection = db["users"]  