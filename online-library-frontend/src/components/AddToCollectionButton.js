// src/components/AddToCollectionButton.js
import React from 'react';
import axios from 'axios';
import { getToken } from '../helpers/token';

const AddToCollectionButton = ({ bookId, onAdd }) => {
  const handleAddToCollection = async () => {
    const token = getToken();
    try {
      await axios.post(`http://localhost:3000/collections/add/${bookId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Книга добавлена в коллекцию');
      onAdd(bookId);
    } catch (error) {
      console.error('Ошибка при добавлении книги в коллекцию', error);
    }
  };

  return (
    <button onClick={handleAddToCollection}>Добавить в коллекцию</button>
  );
};

export default AddToCollectionButton;
