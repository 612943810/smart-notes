from fastapi import FastAPI, HTTPException, Depends
from typing import List
from . import models, schemas
from .database import engine, SessionLocal
from sqlalchemy.orm import Session
from datetime import datetime

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Smart Notes API", version="1.0.0")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/notes", response_model=List[schemas.Note], tags=["notes"])
def get_notes(db: Session = Depends(get_db)):
    notes = db.query(models.Note).all()
    return notes

@app.post("/notes", response_model=schemas.Note, tags=["notes"])
def create_note(note: schemas.NoteCreate, db: Session = Depends(get_db)):
    db_note = models.Note(**note.dict())
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

@app.get("/notes/{note_id}", response_model=schemas.Note, tags=["notes"])
def get_note(note_id: int, db: Session = Depends(get_db)):
    note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

@app.put("/notes/{note_id}", response_model=schemas.Note, tags=["notes"])
def update_note(note_id: int, note: schemas.NoteCreate, db: Session = Depends(get_db)):
    db_note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if db_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    for key, value in note.model_dump().items():
        setattr(db_note, key, value)
    db.commit()
    db.refresh(db_note)
    return db_note

@app.delete("/notes/{note_id}", tags=["notes"])
def delete_note(note_id: int, db: Session = Depends(get_db)):
    db_note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if db_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    db.delete(db_note)
    db.commit()
    return {"detail": "Note deleted successfully"}
