import React, { useEffect, useState, useContext } from 'react'; // Импортируем React и хуки useEffect, useState, useContext из библиотеки React
import axios from 'axios'; // Импортируем axios для отправки HTTP-запросов
import AuthContext from '../../components/AuthContext'; // Импортируем контекст авторизации
import "./AdminPanel.css"; // Импортируем стили для админ-панели

const AdminPanel = () => {
  const [users, setUsers] = useState([]); // Состояние для списка пользователей
  const [filteredUsers, setFilteredUsers] = useState([]); // Состояние для отфильтрованных пользователей
  const [newAdminUsername, setNewAdminUsername] = useState(''); // Состояние для имени нового администратора
  const [newBookTitle, setNewBookTitle] = useState(''); // Состояние для названия новой книги
  const [newBookAuthor, setNewBookAuthor] = useState(''); // Состояние для автора новой книги
  const [newBookText, setNewBookText] = useState('<p></p>'); // Состояние для описания новой книги
  const [books, setBooks] = useState([]); // Состояние для списка книг
  const [editingBookId, setEditingBookId] = useState(null); // Состояние для редактируемой книги
  const [searchTermTitle, setSearchTermTitle] = useState(''); // Состояние для строки поиска по названию
  const [searchTermAuthor, setSearchTermAuthor] = useState(''); // Состояние для строки поиска по автору
  const [searchResults, setSearchResults] = useState([]); // Состояние для результатов поиска
  const [searchTermUser, setSearchTermUser] = useState(''); // Состояние для строки поиска по пользователю
  const { token } = useContext(AuthContext); // Получаем токен из контекста авторизации

  // Загружаем список пользователей и книг при монтировании компонента
  useEffect(() => {
    fetchUsers();
    fetchBooks();
  }, []);

  // Функция для получения списка пользователей
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users', {
        headers: {
          Authorization: `Bearer ${token}`, // Отправляем токен авторизации
        },
      });
      setUsers(response.data); // Устанавливаем список пользователей
      setFilteredUsers(response.data); // Устанавливаем отфильтрованных пользователей
    } catch (error) {
      console.error('Error fetching users:', error); // Обрабатываем ошибку
    }
  };

  // Функция для получения списка книг
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/books', {
        headers: {
          Authorization: `Bearer ${token}`, // Отправляем токен авторизации
        },
      });
      setBooks(response.data); // Устанавливаем список книг
      setSearchResults(response.data); // Устанавливаем результаты поиска при загрузке всех книг
    } catch (error) {
      console.error('Error fetching books:', error); // Обрабатываем ошибку
    }
  };

  // Функция для назначения пользователя администратором
  const makeAdmin = async (username) => {
    try {
      await axios.post('http://localhost:3000/auth/make-admin', { username }, {
        headers: {
          Authorization: `Bearer ${token}`, // Отправляем токен авторизации
        },
      });
      fetchUsers(); // Обновляем список пользователей
    } catch (error) {
      console.error('Error making user admin:', error); // Обрабатываем ошибку
    }
  };

  // Функция для удаления статуса администратора у пользователя
  const removeAdmin = async (username) => {
    try {
      await axios.post('http://localhost:3000/auth/remove-admin', { username }, {
        headers: {
          Authorization: `Bearer ${token}`, // Отправляем токен авторизации
        },
      });
      fetchUsers(); // Обновляем список пользователей
    } catch (error) {
      console.error('Error removing admin status:', error); // Обрабатываем ошибку
    }
  };

  // Функция для добавления новой книги
  const addBook = async () => {
    try {
      await axios.post('http://localhost:3000/books', { title: newBookTitle, author: newBookAuthor, description: newBookText }, {
        headers: {
          Authorization: `Bearer ${token}`, // Отправляем токен авторизации
        },
      });
      fetchBooks(); // Обновляем список книг
      setNewBookTitle(''); // Сбрасываем состояние названия книги
      setNewBookAuthor(''); // Сбрасываем состояние автора книги
      setNewBookText('<p></p>'); // Сбрасываем состояние описания книги
    } catch (error) {
      console.error('Error adding book:', error); // Обрабатываем ошибку
    }
  };

  // Функция для удаления книги
  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:3000/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Отправляем токен авторизации
        },
      });
      fetchBooks(); // Обновляем список книг
    } catch (error) {
      console.error('Error deleting book:', error); // Обрабатываем ошибку
    }
  };

  // Функция для редактирования книги
  const editBook = (bookId) => {
    setEditingBookId(bookId); // Устанавливаем редактируемую книгу
    const bookToEdit = books.find((book) => book.id === bookId); // Находим книгу для редактирования
    setNewBookTitle(bookToEdit.title); // Устанавливаем состояние названия книги
    setNewBookAuthor(bookToEdit.author); // Устанавливаем состояние автора книги
    setNewBookText(bookToEdit.description); // Устанавливаем состояние описания книги
  };

  // Функция для обновления книги
  const updateBook = async () => {
    try {
      await axios.patch(`http://localhost:3000/books/${editingBookId}`, { title: newBookTitle, author: newBookAuthor, description: newBookText }, {
        headers: {
          Authorization: `Bearer ${token}`, // Отправляем токен авторизации
        },
      });
      fetchBooks(); // Обновляем список книг
      setEditingBookId(null); // Сбрасываем состояние редактируемой книги
      setNewBookTitle(''); // Сбрасываем состояние названия книги
      setNewBookAuthor(''); // Сбрасываем состояние автора книги
      setNewBookText('<p></p>'); // Сбрасываем состояние описания книги
    } catch (error) {
      console.error('Error updating book:', error); // Обрабатываем ошибку
    }
  };

  // Обработчик поиска по названию книги
  const handleSearchTitle = (e) => {
    setSearchTermTitle(e.target.value); // Устанавливаем состояние строки поиска по названию
    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(e.target.value.toLowerCase()) &&
        book.author.toLowerCase().includes(searchTermAuthor.toLowerCase())
    );
    setSearchResults(filteredBooks); // Устанавливаем результаты поиска
  };

  // Обработчик поиска по автору книги
  const handleSearchAuthor = (e) => {
    setSearchTermAuthor(e.target.value); // Устанавливаем состояние строки поиска по автору
    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTermTitle.toLowerCase()) &&
        book.author.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(filteredBooks); // Устанавливаем результаты поиска
  };

  // Обработчик поиска пользователей
  const handleSearchUser = (e) => {
    setSearchTermUser(e.target.value); // Устанавливаем состояние строки поиска по пользователю
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUsers(filtered); // Устанавливаем отфильтрованных пользователей
  };

  // Функция для автоматического добавления тегов <p> в описание книги
  const handleBookTextChange = (e) => {
    const text = e.target.value; // Получаем текст из текстового поля
    const paragraphs = text.split('\n').map((paragraph) => `<p>${paragraph}</p>`).join(''); // Разделяем текст на абзацы и оборачиваем их в теги <p>
    setNewBookText(paragraphs); // Устанавливаем состояние описания книги
  };

  return (
    <div className="admin-panel-container">
      <h2>Админ Панель</h2>
      <section className="admin-panel-section">
        <h3>Добавить книгу</h3>
        <input
          type="text"
          value={newBookTitle}
          onChange={(e) => setNewBookTitle(e.target.value)}
          className="admin-panel-input"
          placeholder="Введите название книги"
        />
        <input
          type="text"
          value={newBookAuthor}
          onChange={(e) => setNewBookAuthor(e.target.value)}
          className="admin-panel-input"
          placeholder="Введите автора книги"
        />
        <textarea
          value={newBookText}
          onChange={handleBookTextChange}
          className="admin-panel-input"
          placeholder="Введите описание книги"
        ></textarea>
        {editingBookId ? (
          <button onClick={updateBook} className="admin-panel-button">Обновить книгу</button>
        ) : (
          <button onClick={addBook} className="admin-panel-button">Добавить книгу</button>
        )}
      </section>
      <section className="admin-panel-section">
        <h3>Поиск книг</h3>
        <input
          type="text"
          value={searchTermTitle}
          onChange={handleSearchTitle}
          className="admin-panel-input"
          placeholder="Поиск по названию"
        />
        <input
          type="text"
          value={searchTermAuthor}
          onChange={handleSearchAuthor}
          className="admin-panel-input"
          placeholder="Поиск по автору"
        />
        <ul className="admin-panel-list">
          {searchResults.map((book) => (
            <li key={book.id} className="admin-panel-list-item">
              <div className="admin-panel-book-info">
                <h4>{book.title}</h4>
                <p>{book.author}</p>
              </div>
              <div className="admin-panel-actions">
                <button onClick={() => editBook(book.id)} className="admin-panel-button">Редактировать</button>
                <button onClick={() => deleteBook(book.id)} className="admin-panel-button">Удалить</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="admin-panel-section">
        <h3>Поиск пользователей</h3>
        <input
          type="text"
          value={searchTermUser}
          onChange={handleSearchUser}
          className="admin-panel-input"
          placeholder="Поиск пользователей"
        />
        <ul className="admin-panel-list">
          {filteredUsers.map((user) => (
            <li key={user.id} className="admin-panel-list-item">
              <div className="admin-panel-user-info">
                <h4>{user.username}</h4>
                <span>{user.isAdmin ? 'Администратор' : 'Пользователь'}</span>
              </div>
              <div className="admin-panel-actions">
                {!user.isAdmin && (
                  <button onClick={() => makeAdmin(user.username)} className="admin-panel-button">Назначить администратором</button>
                )}
                {user.isAdmin && (
                  <button onClick={() => removeAdmin(user.username)} className="admin-panel-button">Удалить статус администратора</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel;
