import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useCollection } from '../context/CollectionContext';
import { useNotes } from '../context/NoteContext';
import Note from './Note';
import AddNoteModal from './AddNoteModal';
import { Note as NoteType } from '../types/types';
import '../styles/Collection.css';

interface CollectionProps {
  collectionId: number;
}

const Collection: React.FC<CollectionProps> = ({ collectionId }) => {
  const { collections, addNoteToCollection, updateCollectionPosition, removeNoteFromCollection, updateNoteInCollection, setModalOpen, isModalOpen } = useCollection();
  const { dispatch } = useNotes();
  const collection = collections.find((col) => col.id === collectionId);

  const [isModalOpenLocal, setIsModalOpenLocal] = useState(false);
  const [currentNote, setCurrentNote] = useState<NoteType | null>(null);
  
  if (!collection) return null;

  const [{ isDragging }, drag] = useDrag({
    type: 'COLLECTION',
    item: { id: collectionId, x: collection.x, y: collection.y },
    canDrag: !isModalOpen,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        const { x: deltaX, y: deltaY } = monitor.getDifferenceFromInitialOffset() || { x: 0, y: 0 };
        updateCollectionPosition(collectionId, item.x + deltaX, item.y + deltaY);
      }
    },
  });

  const [, drop] = useDrop(() => ({
    accept: 'NOTE',
    drop: (note: NoteType) => {
      const newNote = { ...note, collectionId, isInCollection: true };
      addNoteToCollection(collectionId, newNote);
      dispatch({ type: 'DELETE_NOTE', payload: note.id });
    },
  }));

  const editNote = (note: NoteType) => {
    setCurrentNote(note);
    setIsModalOpenLocal(true);
    setModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpenLocal(false);
    setModalOpen(false);
    setCurrentNote(null);
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="collection-container"
      style={{ transform: `translate(${collection.x}px, ${collection.y}px)`, opacity: isDragging ? 0.5 : 1 }}
    >
      <h3 className="collection-title">{collection.name}</h3>
      <div className="collection-notes">
        {collection.notes.length > 0 ? (
          collection.notes.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              x={0}
              y={0}
              updateNotePosition={() => {}}
              onDelete={() => removeNoteFromCollection(collectionId, note.id)}
              onEdit={() => editNote(note)}
              isMovable={!isModalOpen}
            />
          ))
        ) : (
          <p>No hay notas en esta colección.</p>
        )}
      </div>

      {isModalOpenLocal && (
        <AddNoteModal
          isOpen={isModalOpenLocal}
          onClose={closeModal}
          noteToEdit={currentNote}
          onAddNote={(updatedNote) => {
            if (updatedNote.collectionId) {
              updateNoteInCollection(collectionId, updatedNote);
            }
          }}
        />
      )}
    </div>
  );
};

export default Collection;
