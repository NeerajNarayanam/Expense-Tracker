from pydantic import BaseModel

class Income(BaseModel):
    title: str
    amount: float