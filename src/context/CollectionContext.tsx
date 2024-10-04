
import React, { createContext, useContext, useReducer, ReactNode, useState } from 'react';
import { collectionReducer } from '../reducers/collectionReducer';
import { Collection, Note } from '../types/types';

interface CollectionContextProps {
  collections: Collection[];
  addNoteToCollection: (collectionId: number, note: Note) => void;
  updateNoteInCollection: (collectionId: number, updatedNote: Partial<Note>) => void;
  removeNoteFromCollection: (collectionId: number, noteId: number) => void;
  updateCollectionPosition: (collectionId: number, x: number, y: number) => void;
  createCollection: (name: string, x: number, y: number) => void;
  setModalOpen: (isOpen: boolean) => void;  // Include this in the context
  isModalOpen: boolean;
}

interface CollectionProviderProps {
  children: ReactNode;
}

const CollectionContext = createContext<CollectionContextProps | undefined>(undefined);

export const useCollection = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollection must be used within a CollectionProvider');
  }
  return context;
};

export const CollectionProvider: React.FC<CollectionProviderProps> = ({ children }) => {
  const [collections, dispatch] = useReducer(collectionReducer, []);
  const [isModalOpen, setModalOpen] = useState(false);  // State to track modal open/close status

  const createCollection = (name: string, x: number, y: number) => {
    const newCollection: Collection = {
      id: Date.now(),
      name,
      x,
      y,
      notes: [],
    };
    dispatch({ type: 'CREATE_COLLECTION', payload: newCollection });
  };

  const addNoteToCollection = (collectionId: number, note: Note) => {
    dispatch({ type: 'ADD_NOTE_TO_COLLECTION', payload: { collectionId, note } });
  };

  const updateNoteInCollection = (collectionId: number, updatedNote: Partial<Note>) => {
    dispatch({ type: 'UPDATE_NOTE_IN_COLLECTION', payload: { collectionId, updatedNote } });
  };

  const removeNoteFromCollection = (collectionId: number, noteId: number) => {
    dispatch({ type: 'REMOVE_NOTE_FROM_COLLECTION', payload: { collectionId, noteId } });
  };

  const updateCollectionPosition = (collectionId: number, x: number, y: number) => {
    dispatch({ type: 'UPDATE_COLLECTION_POSITION', payload: { collectionId, x, y } });
  };

  return (
    <CollectionContext.Provider
      value={{
        collections,
        isModalOpen,
        setModalOpen,
        createCollection,
        addNoteToCollection,
        updateNoteInCollection,
        removeNoteFromCollection,
        updateCollectionPosition,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};
