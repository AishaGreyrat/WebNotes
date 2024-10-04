import React, { useState } from 'react';
import { useCollection } from '../context/CollectionContext';
import '../styles/Modal.css';

interface AddCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCollectionModal: React.FC<AddCollectionModalProps> = ({ isOpen, onClose }) => {
  const { createCollection } = useCollection();
  const [name, setName] = useState('');

  const handleSave = () => {
    if (name.trim()) {
      createCollection(name, 20, 30);
      onClose();
      setName('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Agregar Colección</h2>
        <input
          type="text"
          placeholder="Nombre de la colección"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSave}>Guardar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default AddCollectionModal;
