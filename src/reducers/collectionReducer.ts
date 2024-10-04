
import { Collection, Note } from '../types/types';

type CollectionAction =
  | { type: 'CREATE_COLLECTION'; payload: Collection }
  | { type: 'ADD_NOTE_TO_COLLECTION'; payload: { collectionId: number, note: Note } }
  | { type: 'UPDATE_NOTE_IN_COLLECTION'; payload: { collectionId: number, updatedNote: Partial<Note> } }
  | { type: 'REMOVE_NOTE_FROM_COLLECTION'; payload: { collectionId: number, noteId: number } }
  | { type: 'UPDATE_COLLECTION_POSITION'; payload: { collectionId: number, x: number, y: number } };

export const collectionReducer = (state: Collection[], action: CollectionAction): Collection[] => {
  switch (action.type) {
    case 'CREATE_COLLECTION':
      return [...state, action.payload];

    case 'ADD_NOTE_TO_COLLECTION':
      return state.map((collection) => {
        if (collection.id === action.payload.collectionId) {
          return {
            ...collection,
            notes: [...collection.notes, action.payload.note], 
          };
        }
        return collection;
      });

    case 'UPDATE_NOTE_IN_COLLECTION':
      return state.map((collection) => {
        if (collection.id === action.payload.collectionId) {
          return {
            ...collection,
            notes: collection.notes.map((note) =>
              note.id === action.payload.updatedNote.id ? { ...note, ...action.payload.updatedNote } : note
            ),
          };
        }
        return collection;
      });

    case 'REMOVE_NOTE_FROM_COLLECTION':
      return state.map((collection) => {
        if (collection.id === action.payload.collectionId) {
          return {
            ...collection,
            notes: collection.notes.filter((note) => note.id !== action.payload.noteId),
          };
        }
        return collection;
      });

    case 'UPDATE_COLLECTION_POSITION':
      return state.map((collection) =>
        collection.id === action.payload.collectionId
          ? { ...collection, x: action.payload.x, y: action.payload.y }
          : collection
      );

    default:
      return state;
  }
};
