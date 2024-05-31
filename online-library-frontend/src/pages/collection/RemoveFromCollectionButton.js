import React, {useContext} from 'react';
import axios from 'axios';
import AuthContext from '../../components/AuthContext';

// Компонент кнопки удаления книги из коллекции
const RemoveFromCollectionButton = ({ bookId, onRemove }) => {
  const { token } = useContext(AuthContext); // Получаем токен из контекста авторизации

  // Функция для обработки удаления книги из коллекции
  const handleRemoveFromCollection = async () => {
    try {
      // Отправляем запрос на удаление книги из коллекции
      await axios.delete(`http://localhost:3000/collections/remove/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Книга удалена из коллекции'); // Сообщаем пользователю об успешном удалении
      onRemove(bookId); // Вызываем функцию обратного вызова для обновления состояния коллекции
    } catch (error) {
      console.error('Ошибка при удалении книги из коллекции', error); // Выводим ошибку в консоль
    }
  };

  return (
    <button onClick={handleRemoveFromCollection}>Удалить из коллекции</button> // Кнопка для удаления книги
  );
};

export default RemoveFromCollectionButton;
