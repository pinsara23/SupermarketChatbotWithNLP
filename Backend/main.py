from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from nlp_engine import process_text, load_inventory

app = FastAPI(title="Supermarket Chatbot API")

#CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

INVENTORY = load_inventory()

#define i/o structures
class ChatRequest(BaseModel):
    user_input: str

class ProductLocation(BaseModel):
    item: str
    shelf: str

class ChatResponse(BaseModel):
    locations: List[ProductLocation]
    unrecognized: List[str]

@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    return process_text(request.user_input, INVENTORY)
