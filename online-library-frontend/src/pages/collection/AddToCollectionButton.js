import React, {useContext} from 'react';
import axios from 'axios';
import AuthContext from '../../components/AuthContext';

const AddToCollectionButton = ({ bookId, onAdd }) => {
  const { token } = useContext(AuthContext);
  const handleAddToCollection = async () => {
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
