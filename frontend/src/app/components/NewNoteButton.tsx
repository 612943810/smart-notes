interface NewNoteButtonProps {
  onClick: () => void;
}

export default function NewNoteButton({ onClick }: NewNoteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
    >
      New Note
    </button>
  );
}
