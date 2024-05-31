// src/components/RemoveFromCollectionButton.js
import React from 'react';
import axios from 'axios';
import { getToken } from '../helpers/token';

const RemoveFromCollectionButton = ({ bookId, onRemove }) => {
  const handleRemoveFromCollection = async () => {
    const token = getToken();
    try {
      await axios.delete(`http://localhost:3000/collections/remove/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Книга удалена из коллекции');
      onRemove(bookId);
    } catch (error) {
      console.error('Ошибка при удалении книги из коллекции', error);
    }
  };

  return (
    <button onClick={handleRemoveFromCollection}>Удалить из коллекции</button>
  );
};

export default RemoveFromCollectionButton;
