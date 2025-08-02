'use client';

import { Note } from '@/types';
import { useState } from 'react';
import { format } from 'date-fns';

interface NoteCardProps {
  note: Note;
  onEdit: () => void;
  onDelete: (noteId: number) => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
        <div>
          <button
            onClick={onEdit}
            className="text-sm text-blue-600 hover:text-blue-800 mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-gray-700 mb-4 line-clamp-3">{note.content}</p>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>{format(new Date(note.created_at), 'MMM d, yyyy')}</span>
        {note.reminder && (
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {format(new Date(note.reminder), 'MMM d, yyyy HH:mm')}
          </span>
        )}
      </div>
    </div>
  );
}
