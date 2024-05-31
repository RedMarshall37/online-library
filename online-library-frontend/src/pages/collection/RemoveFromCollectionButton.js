// src/components/RemoveFromCollectionButton.js
import React, {useContext} from 'react';
import axios from 'axios';
import AuthContext from '../../components/AuthContext';

const RemoveFromCollectionButton = ({ bookId, onRemove }) => {
  const { token } = useContext(AuthContext);
  const handleRemoveFromCollection = async () => {
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
