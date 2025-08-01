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
      const response = await fetch('http://localhost:8000/notes');
      const data = await response.json();
      setNotes(data);
    };
    fetchNotes();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const fetchSearchedNotes = async () => {
        if (searchQuery) {
          const response = await fetch(`http://localhost:8000/notes/search?q=${searchQuery}`);
          const data = await response.json();
          setNotes(data);
        } else {
          const response = await fetch('http://localhost:8000/notes');
          const data = await response.json();
          setNotes(data);
        }
      };
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
