import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddToCollectionButton from '../collection/AddToCollectionButton';
import AuthContext from '../../components/AuthContext';

function BookDetail() {
  const { token } = useContext(AuthContext); // Получаем токен из контекста авторизации
  const [book, setBook] = useState({}); // Состояние для хранения информации о книге
  const { id } = useParams(); // Получаем параметр id из URL

  // Эффект для получения информации о книге при загрузке компонента
  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(`http://localhost:3000/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBook(response.data); // Устанавливаем информацию о книге
    };
    fetchBook();
  }, [id, token]);

  return (
    <div>
      <h2>{book.title}</h2> {/* Заголовок книги */}
      <p>{book.author}</p> {/* Автор книги */}
      <p>{book.description}</p> {/* Текст книги */}
      <AddToCollectionButton bookId={id} /> {/* Кнопка для добавления книги в коллекцию */}
    </div>
  );
}

export default BookDetail;
