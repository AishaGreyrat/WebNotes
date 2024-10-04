// src/types/types.ts

// Interfaz para una Nota
export interface Note {
  id: number;
  title: string;
  content: string;
  category?: string;
  tags?: string[];
  x: number;
  y: number;
  collectionId?: number;
}

// Estado para las notas
export interface NoteState {
  notes: Note[];
  deletedNotes: Note[];
}

// Acciones permitidas para las notas
export type NoteAction =
  | { type: 'ADD_NOTE'; payload: Note }
  | { type: 'DELETE_NOTE'; payload: number }
  | { type: 'EDIT_NOTE'; payload: Note }
  | { type: 'UPDATE_NOTE_POSITION'; payload: { id: number; x: number; y: number } };

/* Colecciones */

// Definimos la interfaz para una colección
export interface Collection {
  id: number;
  name: string;
  notes: Note[];
  x: number;
  y: number;
}

// Estado de las colecciones
export interface CollectionState {
  collections: Collection[];
}

// Acciones permitidas para las colecciones
export type CollectionAction =
  | { type: 'ADD_COLLECTION'; payload: { id: number; title: string; notes: number[] } }
  | { type: 'DELETE_COLLECTION'; payload: { id: number } }
  | { type: 'UPDATE_COLLECTIONS'; payload: Collection[] };
