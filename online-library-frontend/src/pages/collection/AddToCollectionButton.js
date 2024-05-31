import React, {useContext} from 'react';
import axios from 'axios';
import AuthContext from '../../components/AuthContext';
import './AddToCollectionButton.css';

// Компонент кнопки добавления книги в коллекцию
const AddToCollectionButton = ({ bookId, onAdd }) => {
  const { token } = useContext(AuthContext); // Получаем токен из контекста авторизации

  // Функция для обработки добавления книги в коллекцию
  const handleAddToCollection = async () => {
    try {
      // Отправляем запрос на добавление книги в коллекцию
      await axios.post(`http://localhost:3000/collections/add/${bookId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Книга добавлена в коллекцию'); // Сообщаем пользователю об успешном добавлении
      onAdd(bookId); // Вызываем функцию обратного вызова для обновления состояния коллекции
    } catch (error) {
      console.error('Ошибка при добавлении книги в коллекцию', error); // Выводим ошибку в консоль
    }
  };

  return (
    <button onClick={handleAddToCollection} className="add-to-collection-button">Добавить в коллекцию</button> // Применяем класс для стилизации
  );

};

export default AddToCollectionButton;
