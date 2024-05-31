import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddToCollectionButton from '../collection/AddToCollectionButton';
import RemoveFromCollectionButton from '../collection/RemoveFromCollectionButton';
import AuthContext from '../../components/AuthContext';
import './BookDetail.css';

function BookDetail() {
  const { token } = useContext(AuthContext);
  const [book, setBook] = useState({});
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [inCollection, setInCollection] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(`http://localhost:3000/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBook(response.data);
      checkBookInCollection(response.data.id);
    };
    fetchBook();
  }, [id, token]);

  const pageSize = 5000; // Размер страницы, можно изменить по необходимости

  // Функция для разбиения текста на страницы
  const paginateText = (text, currentPage, pageSize) => {
    if (!text) return '';
    const totalPages = Math.ceil(text.length / pageSize);
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return {
      currentPageContent: text.slice(startIndex, endIndex),
      totalPages: totalPages,
    };
  };

  const { currentPageContent, totalPages } = paginateText(book.description, currentPage, pageSize);

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
          Authorization: `Bearer ${token}`,
        },
      });
      const collection = response.data;
      const isInCollection = collection.some(item => item.book.id === bookId);
      setInCollection(isInCollection);
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
      <div className="book-description" dangerouslySetInnerHTML={{ __html: currentPageContent }}></div>
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
