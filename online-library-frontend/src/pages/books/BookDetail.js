import React, { useState, useEffect, useContext } from 'react'; // Импортируем React и хуки useState, useEffect, useContext
import axios from 'axios'; // Импортируем axios для выполнения HTTP-запросов
import { useParams } from 'react-router-dom'; // Импортируем useParams для получения параметров маршрута
import AddToCollectionButton from '../collection/AddToCollectionButton'; // Импортируем компонент кнопки добавления в коллекцию
import RemoveFromCollectionButton from '../collection/RemoveFromCollectionButton'; // Импортируем компонент кнопки удаления из коллекции
import AuthContext from '../../components/AuthContext'; // Импортируем контекст авторизации
import './BookDetail.css'; // Импортируем стили для компонента

function BookDetail() {
  const { token } = useContext(AuthContext); // Получаем токен из контекста авторизации
  const [book, setBook] = useState({}); // Состояние для хранения данных книги
  const { id } = useParams(); // Получаем параметр id из URL
  const [currentPage, setCurrentPage] = useState(0); // Состояние для текущей страницы описания книги
  const [inCollection, setInCollection] = useState(false); // Состояние для проверки, находится ли книга в коллекции

  // useEffect для получения данных книги при изменении id или token
  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(`http://localhost:3000/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Отправляем токен авторизации
        },
      });
      setBook(response.data); // Устанавливаем данные книги
      checkBookInCollection(response.data.id); // Проверяем, находится ли книга в коллекции пользователя
    };
    fetchBook();
  }, [id, token]);

  const pageSize = 5000; // Размер страницы, можно изменить по необходимости

  // Функция для разбиения текста на страницы
  const paginateText = (text, currentPage, pageSize) => {
    if (!text) return '';
    const totalPages = Math.ceil(text.length / pageSize); // Рассчитываем общее количество страниц
    const startIndex = currentPage * pageSize; // Начальный индекс текущей страницы
    const endIndex = startIndex + pageSize; // Конечный индекс текущей страницы
    return {
      currentPageContent: text.slice(startIndex, endIndex), // Текущий контент страницы
      totalPages: totalPages, // Общее количество страниц
    };
  };

  const { currentPageContent, totalPages } = paginateText(book.description, currentPage, pageSize); // Разбиваем текст описания книги на страницы

  // Функция для перехода к следующей странице
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Функция для перехода к предыдущей странице
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Проверка, есть ли книга в коллекции пользователя
  const checkBookInCollection = async (bookId) => {
    try {
      const response = await axios.get(`http://localhost:3000/collections/user`, {
        headers: {
          Authorization: `Bearer ${token}`, // Отправляем токен авторизации
        },
      });
      const collection = response.data;
      const isInCollection = collection.some(item => item.book.id === bookId); // Проверяем, есть ли книга в коллекции
      setInCollection(isInCollection); // Устанавливаем состояние
    } catch (error) {
      console.error('Ошибка при проверке книги в коллекции:', error);
    }
  };

  // Добавление книги в коллекцию
  const handleAddToCollection = async () => {
    setInCollection(true);
  };

  // Удаление книги из коллекции
  const handleRemoveFromCollection = async () => {
    setInCollection(false);
  };

  return (
    <div className="book-detail-container">
      <h2 className="book-title">{book.title}</h2>
      <p className="book-author">{book.author}</p>
      <div className="book-description" dangerouslySetInnerHTML={{ __html: currentPageContent }}></div> {/* Отображаем текущую страницу описания книги */}
      <div className="pagination-buttons">
        <button onClick={handlePrevPage} disabled={currentPage === 0}>Предыдущая</button>
        <span>{`Страница ${currentPage + 1} из ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>Следующая</button>
      </div>
      {inCollection ? (
        <RemoveFromCollectionButton bookId={id} onRemove={handleRemoveFromCollection} />
      ) : (
        <AddToCollectionButton bookId={id} onAdd={handleAddToCollection} />
      )}
    </div>
  );
}

export default BookDetail;
