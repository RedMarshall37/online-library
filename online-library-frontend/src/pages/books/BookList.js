// src/components/BookList.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AddToCollectionButton from '../collection/AddToCollectionButton';
import RemoveFromCollectionButton from '../collection/RemoveFromCollectionButton';
import AuthContext from '../../components/AuthContext';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [collection, setCollection] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    const fetchCollection = async () => {
      try {
        const response = await axios.get('http://localhost:3000/collections/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCollection(response.data);
      } catch (error) {
        console.error('Ошибка при получении коллекции пользователя', error);
      }
    };

    fetchBooks();
    fetchCollection();
  }, [navigate]);

  useEffect(() => {
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      book.author.toLowerCase().includes(searchAuthor.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [books, searchTitle, searchAuthor]);

  const isBookInCollection = (bookId) => {
    return collection.some(item => item.book.id === bookId);
  };

  const handleAddToCollection = (bookId) => {
    setCollection([...collection, { book: { id: bookId } }]);
  };

  const handleRemoveFromCollection = (bookId) => {
    setCollection(collection.filter(item => item.book.id !== bookId));
  };

  return (
    <div>
      <h2>Список книг</h2>
      <input 
        type="text" 
        placeholder="Поиск по названию" 
        value={searchTitle} 
        onChange={(e) => setSearchTitle(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Поиск по автору" 
        value={searchAuthor} 
        onChange={(e) => setSearchAuthor(e.target.value)} 
      />

      {filteredBooks.length === 0 ? (
        <p>Книги не найдены</p>
      ) : (
        <ul>
          {filteredBooks.map((book) => (
            <li key={book.id}>
              <Link to={`/book/${book.id}`}>{book.title}</Link>
              <p>Автор: {book.author}</p>
              {isBookInCollection(book.id) ? (
                <RemoveFromCollectionButton bookId={book.id} onRemove={handleRemoveFromCollection} />
              ) : (
                <AddToCollectionButton bookId={book.id} onAdd={handleAddToCollection} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
