from fastapi import FastAPI
from typing import List

app = FastAPI()

@app.get("/notes", response_model=List[str])
def get_notes():
    return ["Note 1", "Note 2"]