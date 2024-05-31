import React, { useContext } from 'react'; // Импортируем React и хук useContext из библиотеки React
import axios from 'axios'; // Импортируем axios для отправки HTTP-запросов
import AuthContext from '../../components/AuthContext'; // Импортируем контекст авторизации
import './RemoveFromCollectionButton.css'; // Импортируем стили для кнопки удаления

// Компонент кнопки удаления книги из коллекции
const RemoveFromCollectionButton = ({ bookId, onRemove }) => {
  const { token } = useContext(AuthContext); // Получаем токен из контекста авторизации

  // Функция для обработки удаления книги из коллекции
  const handleRemoveFromCollection = async () => {
    try {
      // Отправляем запрос на удаление книги из коллекции
      await axios.delete(`http://localhost:3000/collections/remove/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Книга удалена из коллекции'); // Сообщаем пользователю об успешном удалении
      onRemove(bookId); // Вызываем функцию обратного вызова для обновления состояния коллекции
    } catch (error) {
      console.error('Ошибка при удалении книги из коллекции', error); // Выводим ошибку в консоль
    }
  };

  return (
    <button onClick={handleRemoveFromCollection} className="remove-from-collection-button">Удалить из коллекции</button> // Применяем класс для стилизации
  );
};

export default RemoveFromCollectionButton;