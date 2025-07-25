from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class NoteBase(BaseModel):
    title: str
    content: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class NoteCreate(NoteBase):
    pass

class Note(NoteBase):
    id: int

    class Config:
        from_attributes = True
