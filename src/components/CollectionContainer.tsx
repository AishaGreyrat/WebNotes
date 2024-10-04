import React, { useState } from 'react';
import { useCollection } from '../context/CollectionContext';
import Collection from './Collection';
import AddCollectionModal from './AddCollectionModal';
import '../styles/Collection.css';

const CollectionContainer: React.FC = () => {
  const { collections } = useCollection();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="collection-container">
      <div className="collections-header">
        <h2 className="collections-title">Tus Colecciones</h2>
        <button onClick={openModal} className="add-collection-btn">Agregar Colección</button>
      </div>
      <div className="collections-list">
        {collections.length > 0 ? (
          collections.map((collection) => (
            <Collection key={collection.id} collectionId={collection.id} />
          ))
        ) : (
          <p>No hay colecciones disponibles.</p>
        )}
      </div>
      <AddCollectionModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default CollectionContainer;
