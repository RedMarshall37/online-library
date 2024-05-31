import React, { useContext } from 'react'; // Импортируем React и хук useContext из библиотеки React
import axios from 'axios'; // Импортируем axios для отправки HTTP-запросов
import AuthContext from '../../components/AuthContext'; // Импортируем контекст авторизации
import './AddToCollectionButton.css'; // Импортируем стили для кнопки добавления

// Компонент кнопки добавления книги в коллекцию
const AddToCollectionButton = ({ bookId, onAdd }) => {
  const { token } = useContext(AuthContext); // Получаем токен из контекста авторизации

  // Функция для обработки добавления книги в коллекцию
  const handleAddToCollection = async () => {
    try {
      // Отправляем запрос на добавление книги в коллекцию
      await axios.post(`http://localhost:3000/collections/add/${bookId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
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