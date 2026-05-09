from motor.motor_asyncio import AsyncIOMotorClient

# MONGODB CONNECTION URL
MONGO_URL = "mongodb+srv://expenseadmin:password1234@cluster0.ynjux3s.mongodb.net/?appName=Cluster0"

# DATABASE NAME
DATABASE_NAME = "expense_tracker"

# CONNECT TO MONGODB
client = AsyncIOMotorClient(
    MONGO_URL
)

db = client[DATABASE_NAME]

# COLLECTIONS
expense_collection = db["expenses"]

income_collection = db["income"]

user_collection = db["users"]