'use client';
import { Note } from '@/types';
import NoteCard from './NoteCard';
import NewNoteButton from './NewNoteButton';

interface NoteListProps {
  notes: Note[];
  onCreateNote: () => void;
  onEditNote: (note: Note) => void;
}

export default function NoteList({ notes, onCreateNote, onEditNote }: NoteListProps) {
  return (
    <div className="note-list">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Notes</h2>
        <NewNoteButton onClick={onCreateNote} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={() => onEditNote(note)}
          />
        ))}
      </div>
    </div>
  );
}
