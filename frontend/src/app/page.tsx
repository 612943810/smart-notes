'use client';

import { useState, useEffect } from 'react';
import { Note } from '../types';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
      const fetchNotes = async () => {
        const response = await fetch('http://localhost:8000/notes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setNotes(data);
      };
    fetchNotes();
  }, []);

  const fetchSearchedNotes = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'https://smart-notes-6km4.onrender.com' : 'http://localhost:8000';
    const url = searchQuery ? `${baseUrl}/notes/search?q=${searchQuery}` : `${baseUrl}/notes`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    setNotes(data);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
       fetchSearchedNotes();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleCreateNote = () => {
    setSelectedNote(null);
    setIsFormVisible(true);
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setIsFormVisible(true);
  };

  const handleNoteSubmit = async (newNote: Note) => {
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://smart-notes-6km4.onrender.com';
    const url = selectedNote ? `${baseUrl}/notes/${selectedNote.id}` : `${baseUrl}/notes`;
    const method = selectedNote ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    });
    const updatedNote = await response.json();
    if (selectedNote) {
      setNotes(notes.map(note =>
        note.id === selectedNote.id ? updatedNote : note
      ));
    } else {
      setNotes([...notes, updatedNote]);
    }
    setIsFormVisible(false);
  };

  const handleDeleteNote = async (noteId: number) => {
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://smart-notes-6km4.onrender.com';
    const response = await fetch(`${baseUrl}/notes/${noteId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setNotes(notes.filter(note => note.id !== noteId));
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Smart Notes</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <NoteList
        notes={notes}
        onCreateNote={handleCreateNote}
        onEditNote={handleEditNote}
        onDeleteNote={handleDeleteNote}
      />
      {isFormVisible && (
        <NoteForm
          note={selectedNote || undefined}
          onSubmit={handleNoteSubmit}
          onClose={() => setIsFormVisible(false)}
        />
      )}
    </main>
  );
}
