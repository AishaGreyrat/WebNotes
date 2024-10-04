import React, { useState } from 'react';
import { useNotes } from '../context/NoteContext';
import Note from './Note';
import AddNoteModal from './AddNoteModal';
import { Note as NoteType } from '../types/types';
import '../styles/Note.css';

const NotePanel: React.FC = () => {
  const { state, dispatch } = useNotes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<number | null>(null);


  const updateNotePosition = (id: number, x: number, y: number) => {
    dispatch({
      type: 'UPDATE_NOTE_POSITION',
      payload: { id, x, y },
    });
  };


  const deleteNote = (id: number) => {
    dispatch({
      type: 'DELETE_NOTE',
      payload: id,
    });
  };


  const editNote = (id: number) => {
    setCurrentNote(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentNote(null);
  };

  return (
    <div className="note-panel">
      {state.notes.length > 0 ? (
        state.notes.map((note: NoteType) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            x={note.x}
            y={note.y}
            updateNotePosition={updateNotePosition}
            onDelete={deleteNote}
            onEdit={editNote}
          />
        ))
      ) : (
        <p>No hay notas disponibles.</p>
      )}
      <AddNoteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        noteToEdit={currentNote ? state.notes.find(note => note.id === currentNote) : null}
      />
    </div>
  );
};

export default NotePanel;
