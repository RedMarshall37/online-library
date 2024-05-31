// src/components/Collection.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RemoveFromCollectionButton from './RemoveFromCollectionButton';
import AuthContext from '../../components/AuthContext';

function Collection() {
  const [collection, setCollection] = useState([]);
  const [filteredCollection, setFilteredCollection] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCollection = async () => {
      const response = await axios.get('http://localhost:3000/collections/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCollection(response.data);
      setFilteredCollection(response.data);
      console.log(user);
      console.log(token);
    };
    fetchCollection();
  }, []);

  useEffect(() => {
    const filtered = collection.filter(collection =>
      collection.book.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      collection.book.author.toLowerCase().includes(searchAuthor.toLowerCase())
    );
    setFilteredCollection(filtered);
  }, [collection, searchTitle, searchAuthor]);

  const handleRemove = (bookId) => {
    setCollection(collection.filter(item => item.book.id !== bookId));
    setFilteredCollection(filteredCollection.filter(item => item.book.id !== bookId));
  };

  return (
    <div>
      <h2>Моя коллекция</h2>
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

      {filteredCollection.length === 0 ? (
        <p>Книги не найдены</p>
      ) : (
        <ul>
          {filteredCollection.map((collection) => (
            <li key={collection.book.id}>
              <Link to={`/book/${collection.book.id}`}>{collection.book.title}</Link>
              <p>Автор: {collection.book.author}</p>
              <RemoveFromCollectionButton bookId={collection.book.id} onRemove={handleRemove} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Collection;
