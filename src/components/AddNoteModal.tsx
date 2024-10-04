import React, { useState, useEffect } from 'react';
import { useNotes } from '../context/NoteContext';
import { Note } from '../types/types';
import '../styles/Modal.css';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNote?: (note: Note) => void;
  noteToEdit?: Note | null;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({ isOpen, onClose, onAddNote, noteToEdit }) => {
  const { dispatch, generateNextId } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title || '');
      setContent(noteToEdit.content || '');
      setCategory(noteToEdit.category || '');
      setTags(noteToEdit.tags ? noteToEdit.tags.join(', ') : '');
    }
  }, [noteToEdit]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      alert('El título y el contenido son obligatorios.');
      return;
    }

    const updatedNote: Note = {
      id: noteToEdit ? noteToEdit.id : generateNextId(),
      title,
      content,
      category,
      tags: tags.split(',').map((tag) => tag.trim()),
      x: noteToEdit ? noteToEdit.x : 0,
      y: noteToEdit ? noteToEdit.y : 0,
      collectionId: noteToEdit ? noteToEdit.collectionId : undefined,
      isInCollection: noteToEdit ? noteToEdit.isInCollection : false,
    };

    if (onAddNote) {
      onAddNote(updatedNote);
    } else {
      if (noteToEdit) {
        dispatch({ type: 'EDIT_NOTE', payload: updatedNote });
      } else {
        dispatch({ type: 'ADD_NOTE', payload: updatedNote });
      }
    }

    onClose();
    setTitle('');
    setContent('');
    setCategory('');
    setTags('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{noteToEdit ? 'Editar Nota' : 'Agregar Nota'}</h2>
        <form onSubmit={handleSave}>
          <input
            type="text"
            placeholder="Título"
            className="modal-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Contenido"
            className="modal-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="Categoría"
            className="modal-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="text"
            placeholder="Etiquetas (separadas por comas)"
            className="modal-input"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <div className="modal-buttons">
            <button type="submit" className="save-btn">Guardar</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNoteModal;
