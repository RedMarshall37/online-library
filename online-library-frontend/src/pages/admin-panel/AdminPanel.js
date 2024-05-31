import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../components/AuthContext';

const AdminPanel = () => {
  const [users, setUsers] = useState([]); // Состояние для списка пользователей
  const [filteredUsers, setFilteredUsers] = useState([]); // Состояние для отфильтрованных пользователей
  const [newAdminUsername, setNewAdminUsername] = useState(''); // Состояние для имени нового администратора
  const [newBookTitle, setNewBookTitle] = useState(''); // Состояние для названия новой книги
  const [newBookAuthor, setNewBookAuthor] = useState(''); // Состояние для автора новой книги
  const [newBookDescription, setNewBookDescription] = useState(''); // Состояние для описания новой книги
  const [books, setBooks] = useState([]); // Состояние для списка книг
  const [editingBookId, setEditingBookId] = useState(null); // Состояние для редактируемой книги
  const [searchTermTitle, setSearchTermTitle] = useState(''); // Состояние для строки поиска по названию
  const [searchTermAuthor, setSearchTermAuthor] = useState(''); // Состояние для строки поиска по автору
  const [searchResults, setSearchResults] = useState([]); // Состояние для результатов поиска
  const [searchTermUser, setSearchTermUser] = useState(''); // Состояние для строки поиска по пользователю
  const { token } = useContext(AuthContext); // Получаем токен из контекста авторизации

  useEffect(() => {
    fetchUsers();
    fetchBooks();
  }, []);

  // Получение списка пользователей
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data); // Устанавливаем список пользователей
      setFilteredUsers(response.data); // Устанавливаем отфильтрованных пользователей
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Получение списка книг
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/books', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data); // Устанавливаем список книг
      setSearchResults(response.data); // Устанавливаем результаты поиска при загрузке всех книг
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Назначение пользователя администратором
  const makeAdmin = async (username) => {
    try {
      await axios.post('http://localhost:3000/auth/make-admin', { username }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
    } catch (error) {
      console.error('Error making user admin:', error);
    }
  };

  // Удаление статуса администратора у пользователя
  const removeAdmin = async (username) => {
    try {
      await axios.post('http://localhost:3000/auth/remove-admin', { username }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
    } catch (error) {
      console.error('Error removing admin status:', error);
    }
  };

  // Добавление новой книги
  const addBook = async () => {
    try {
      await axios.post('http://localhost:3000/books', { title: newBookTitle, author: newBookAuthor, description: newBookDescription }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBooks();
      setNewBookTitle('');
      setNewBookAuthor('');
      setNewBookDescription('');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  // Удаление книги
  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:3000/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // Редактирование книги
  const editBook = (bookId) => {
    setEditingBookId(bookId);
    const bookToEdit = books.find((book) => book.id === bookId);
    setNewBookTitle(bookToEdit.title);
    setNewBookAuthor(bookToEdit.author);
    setNewBookDescription(bookToEdit.description);
  };

  // Обновление книги
  const updateBook = async () => {
    try {
      await axios.patch(`http://localhost:3000/books/${editingBookId}`, { title: newBookTitle, author: newBookAuthor, description: newBookDescription }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBooks();
      setEditingBookId(null);
      setNewBookTitle('');
      setNewBookAuthor('');
      setNewBookDescription('');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  // Обработчик поиска по названию книги
  const handleSearchTitle = (e) => {
    setSearchTermTitle(e.target.value);
    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(e.target.value.toLowerCase()) &&
        book.author.toLowerCase().includes(searchTermAuthor.toLowerCase())
    );
    setSearchResults(filteredBooks);
  };

  // Обработчик поиска по автору книги
  const handleSearchAuthor = (e) => {
    setSearchTermAuthor(e.target.value);
    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTermTitle.toLowerCase()) &&
        book.author.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(filteredBooks);
  };

  // Обработчик поиска по пользователю
  const handleSearchUser = (e) => {
    setSearchTermUser(e.target.value);
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  return (
    <div>
      <h2>Админ Панель</h2>

      <div>
        <h3>Пользователи</h3>
        <input type="text" placeholder="Имя пользователя" value={searchTermUser} onChange={handleSearchUser} />
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id}>
              {user.username} {user.isAdmin ? '(Админ)' : ''}
              {!user.isAdmin && <button onClick={() => makeAdmin(user.username)}>Сделать админом</button>}
              {user.isAdmin && <button onClick={() => removeAdmin(user.username)}>Удалить админ. права</button>}
            </li>
          ))}
        </ul>
      </div>

      <h3>Добавить книгу</h3>
      <input type="text" placeholder="Название" value={newBookTitle} onChange={(e) => setNewBookTitle(e.target.value)} />
      <input type="text" placeholder="Автор" value={newBookAuthor} onChange={(e) => setNewBookAuthor(e.target.value)} />
      <input type="text" placeholder="Описание книги" value={newBookDescription} onChange={(e) => setNewBookDescription(e.target.value)} />
      <button onClick={editingBookId ? updateBook : addBook}>{editingBookId ? 'Обновить книгу' : 'Добавить книгу'}</button>

      <h3>Поиск</h3>
      <p>Введите название книги:</p>
      <input type="text" placeholder="Название" value={searchTermTitle} onChange={handleSearchTitle} />
      <p>Введите автора книги:</p>
      <input type="text" placeholder="Автор" value={searchTermAuthor} onChange={handleSearchAuthor} />

      <h3>Книги</h3>
      <ul>
        {searchResults.map((book) => (
          <li key={book.id}>
            {book.title} от {book.author}
            <button onClick={() => deleteBook(book.id)}>Удалить</button>
            <button onClick={() => editBook(book.id)}>Редактировать</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
