from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.expenses import (
    router as expense_router
)

from routers.auth import (
    router as auth_router
)

from routers.income import (
    router as income_router
)

app = FastAPI()

# CORS CONFIGURATION
app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",

        "https://expense-tracker-sigma-coral-41.vercel.app",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# ROUTES
app.include_router(
    expense_router
)

app.include_router(
    auth_router
)

app.include_router(
    income_router
)

# HOME ROUTE
@app.get("/")
def home():

    return {
        "message":
        "Expense Tracker Backend Running"
    }