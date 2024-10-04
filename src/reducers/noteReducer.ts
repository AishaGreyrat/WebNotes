import { NoteState, NoteAction } from '../types/types';

export const noteReducer = (state: NoteState, action: NoteAction): NoteState => {
  switch (action.type) {
    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.payload] };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload),
      };
    case 'EDIT_NOTE':
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case 'UPDATE_NOTE_POSITION':
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload.id
            ? { ...note, x: action.payload.x, y: action.payload.y }
            : note
        ),
      };
    default:
      return state;
  }
};
