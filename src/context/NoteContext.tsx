
import React, { createContext, useReducer, ReactNode, useState, useEffect, useContext } from 'react';
import { noteReducer } from '../reducers/noteReducer';
import { NoteState, NoteAction } from '../types/types';

interface NoteContextProps {
  state: NoteState;
  dispatch: React.Dispatch<NoteAction>;
  generateNextId: () => number;
}

const initialState: NoteState = {
  notes: [],
  deletedNotes: [],
};


const loadNotesFromLocalStorage = (): NoteState => {
  try {
    const serializedState = localStorage.getItem('notesState');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Error al cargar las notas desde localStorage', e);
    return initialState;
  }
};


const saveNotesToLocalStorage = (state: NoteState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('notesState', serializedState);
  } catch (e) {
    console.error('Error al guardar las notas en localStorage', e);
  }
};

const NoteContext = createContext<NoteContextProps | undefined>(undefined);

const NoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(noteReducer, initialState, loadNotesFromLocalStorage); // Carga las notas desde localStorage
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    saveNotesToLocalStorage(state);
  }, [state]);

  const generateNextId = () => {
    const id = nextId;
    setNextId(nextId + 1);
    return id;
  };

  return (
    <NoteContext.Provider value={{ state, dispatch, generateNextId }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNotes debe ser usado dentro de un NoteProvider');
  }
  return context;
};

export { NoteProvider };
