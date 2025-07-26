'use client';

import { useState } from 'react';
import { Note } from '../types';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleCreateNote = () => {
    setSelectedNote(null);
    setIsFormVisible(true);
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setIsFormVisible(true);
  };

  const handleNoteSubmit = (newNote: Note) => {
    if (selectedNote) {
      setNotes(notes.map(note => 
        note.id === selectedNote.id ? newNote : note
      ));
    } else {
      setNotes([...notes, newNote]);
    }
    setIsFormVisible(false);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Smart Notes</h1>
      <NoteList
        notes={notes}
        onCreateNote={handleCreateNote}
        onEditNote={handleEditNote}
      />
      {isFormVisible && (
        <NoteForm
          note={selectedNote}
          onSubmit={handleNoteSubmit}
          onClose={() => setIsFormVisible(false)}
        />
      )}
    </main>
  );
}
