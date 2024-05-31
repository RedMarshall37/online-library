import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AddToCollectionButton from '../collection/AddToCollectionButton';
import RemoveFromCollectionButton from '../collection/RemoveFromCollectionButton';
import AuthContext from '../../components/AuthContext';
import './BookList.css';

// Компонент списка книг
const BookList = () => {
  const [books, setBooks] = useState([]); // Состояние для хранения списка книг
  const [collection, setCollection] = useState([]); // Состояние для хранения коллекции книг
  const [searchTitle, setSearchTitle] = useState(''); // Состояние для хранения строки поиска по названию
  const [searchAuthor, setSearchAuthor] = useState(''); // Состояние для хранения строки поиска по автору
  const [filteredBooks, setFilteredBooks] = useState([]); // Состояние для хранения отфильтрованных книг
  const { token } = useContext(AuthContext); // Получаем токен из контекста авторизации
  const navigate = useNavigate(); // Используем для перенаправления

  // Эффект для получения списка книг при загрузке компонента
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('http://localhost:3000/books', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data); // Устанавливаем список книг
      setFilteredBooks(response.data); // Устанавливаем отфильтрованные книги
    };

    const fetchCollection = async () => {
      const response = await axios.get('http://localhost:3000/collections/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCollection(response.data); // Устанавливаем коллекцию книг
    };

    fetchBooks();
    fetchCollection();
  }, [token]);

  // Эффект для фильтрации книг при изменении строки поиска или списка книг
  useEffect(() => {
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      book.author.toLowerCase().includes(searchAuthor.toLowerCase())
    );
    setFilteredBooks(filtered); // Устанавливаем отфильтрованные книги
  }, [books, searchTitle, searchAuthor]);

  // Проверяем, есть ли книга в коллекции
  const isBookInCollection = (bookId) => {
    return collection.some(item => item.book.id === bookId);
  };

  // Функция для обработки добавления книги в коллекцию
  const handleAdd = (bookId) => {
    setCollection([...collection, { book: { id: bookId } }]);
  };

  // Функция для обработки удаления книги из коллекции
  const handleRemove = (bookId) => {
    setCollection(collection.filter(item => item.book.id !== bookId));
  };

  return (
    <div className="book-list-container">
      <h2>Список книг</h2>
      <input
        type="text"
        placeholder="Поиск по названию"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        className="book-list-input" // Применяем класс для стилизации
      />
      <input
        type="text"
        placeholder="Поиск по автору"
        value={searchAuthor}
        onChange={(e) => setSearchAuthor(e.target.value)}
        className="book-list-input" // Применяем класс для стилизации
      />
      <ul className="book-list-list"> {/* Применяем класс для стилизации */}
        {filteredBooks.map(book => (
          <li key={book.id} className="book-list-item"> {/* Применяем класс для стилизации */}
            <Link to={`/book/${book.id}`}>{book.title}</Link>
            <p>Автор: {book.author}</p>
            {isBookInCollection(book.id) ? (
              <RemoveFromCollectionButton bookId={book.id} onRemove={handleRemove} />
            ) : (
              <AddToCollectionButton bookId={book.id} onAdd={handleAdd} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
