import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RemoveFromCollectionButton from './RemoveFromCollectionButton';
import AuthContext from '../../components/AuthContext';

// Компонент страницы коллекции книг
function Collection() {
  const [collection, setCollection] = useState([]); // Состояние для хранения коллекции книг
  const [filteredCollection, setFilteredCollection] = useState([]); // Состояние для хранения отфильтрованной коллекции
  const [searchTitle, setSearchTitle] = useState(''); // Состояние для хранения строки поиска по названию
  const [searchAuthor, setSearchAuthor] = useState(''); // Состояние для хранения строки поиска по автору
  const { token, user } = useContext(AuthContext); // Получаем токен и пользователя из контекста авторизации

  // Эффект для получения коллекции книг при загрузке компонента
  useEffect(() => {
    const fetchCollection = async () => {
      const response = await axios.get('http://localhost:3000/collections/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCollection(response.data); // Устанавливаем коллекцию книг
      setFilteredCollection(response.data); // Устанавливаем отфильтрованную коллекцию
      console.log(user);
      console.log(token);
    };
    fetchCollection();
  }, []);

  // Эффект для фильтрации коллекции при изменении строки поиска или коллекции
  useEffect(() => {
    const filtered = collection.filter(collection =>
      collection.book.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      collection.book.author.toLowerCase().includes(searchAuthor.toLowerCase())
    );
    setFilteredCollection(filtered); // Устанавливаем отфильтрованную коллекцию
  }, [collection, searchTitle, searchAuthor]);

  // Функция для обработки удаления книги из коллекции
  const handleRemove = (bookId) => {
    setCollection(collection.filter(item => item.book.id !== bookId)); // Обновляем состояние коллекции
    setFilteredCollection(filteredCollection.filter(item => item.book.id !== bookId)); // Обновляем отфильтрованную коллекцию
  };

  return (
    <div>
      <h2>Моя коллекция</h2>
      <input
        type="text"
        placeholder="Поиск по названию"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)} // Обновляем строку поиска по названию
      />
      <input
        type="text"
        placeholder="Поиск по автору"
        value={searchAuthor}
        onChange={(e) => setSearchAuthor(e.target.value)} // Обновляем строку поиска по автору
      />

      {filteredCollection.length === 0 ? (
        <p>Книги не найдены</p> // Сообщение, если книги не найдены
      ) : (
        <ul>
          {filteredCollection.map((collection) => (
            <li key={collection.book.id}>
              <Link to={`/book/${collection.book.id}`}>{collection.book.title}</Link> // Ссылка на страницу книги
              <p>Автор: {collection.book.author}</p>
              <RemoveFromCollectionButton bookId={collection.book.id} onRemove={handleRemove} /> // Кнопка для удаления книги из коллекции
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Collection;
