import React from 'react';

interface TrashBinProps {
  onDrop: () => void;
}

const TrashBin: React.FC<TrashBinProps> = ({ onDrop }) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Permite que el elemento sea un destino de drop
  };

  return (
    <div className="trash-bin" onDragOver={handleDragOver} onDrop={onDrop}>
      🗑️ Papelera
    </div>
  );
};

export default TrashBin;
