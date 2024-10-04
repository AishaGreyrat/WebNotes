import React from 'react';
import { useDrag } from 'react-dnd';
import '../styles/Note.css';

interface NoteProps {
  id: number;
  title: string;
  content: string;
  category?: string;
  tags?: string[];
  x: number;
  y: number;
  updateNotePosition: (id: number, x: number, y: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  isMovable?: boolean;
}

const Note: React.FC<NoteProps> = ({ id, title, content, category, tags, x, y, updateNotePosition, onDelete, onEdit, isMovable = true }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'NOTE',
    item: { id, title, content, category, tags, x, y },
    canDrag: isMovable, 
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        const { x: deltaX, y: deltaY } = monitor.getDifferenceFromInitialOffset() || { x: 0, y: 0 };
        updateNotePosition(item.id, item.x + deltaX, item.y + deltaY);
      }
    },
  });

  if (isMovable) {
    drag(ref);
  }

  return (
    <div
      ref={ref}
      className="note-item"
      style={{ opacity: isDragging ? 0.5 : 1, transform: `translate(${x}px, ${y}px)` }}
    >
      <h3 className="note-title">{title}</h3>
      <p className="note-content">{content}</p>
      <button className="edit-button" onClick={() => onEdit(id)}>Editar</button>
      <button className="delete-button" onClick={() => onDelete(id)}>Eliminar</button>
    </div>
  );
};

export default Note;
