import React, { useState } from 'react';
import './styles/global.css';
import './styles/AppBar.css';
import './styles/Modal.css';
import './styles/Note.css';
import { NoteProvider } from './context/NoteContext';
import { CollectionProvider } from './context/CollectionContext';
import AppBar from './components/AppBar';
import AddNoteModal from './components/AddNoteModal';
import NotePanel from './components/NotePanel';
import CollectionContainer from './components/CollectionContainer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <NoteProvider>
        <CollectionProvider>
          <AppBar />
          <button className="add-note-btn" onClick={openModal}>Agregar Nota</button>
          <AddNoteModal isOpen={isModalOpen} onClose={closeModal} />
          <NotePanel />
          <CollectionContainer />
        </CollectionProvider>
      </NoteProvider>
    </DndProvider>
  );
};

export default App;
