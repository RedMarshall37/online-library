import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../components/AuthContext';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const [newBookDescription, setNewBookDescription] = useState('');
  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);
  const [searchTermTitle, setSearchTermTitle] = useState('');
  const [searchTermAuthor, setSearchTermAuthor] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchTermUser, setSearchTermUser] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchUsers();
    fetchBooks();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/books', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBooks(response.data);
      setSearchResults(response.data); // Устанавливаем результаты поиска при загрузке всех книг
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const makeAdmin = async (username) => {
    try {
      await axios.post('http://localhost:3000/auth/make-admin', { username }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error making user admin:', error);
    }
  };

  const removeAdmin = async (username) => {
    try {
      await axios.post('http://localhost:3000/auth/remove-admin', { username }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error removing admin status:', error);
    }
  };

  const addBook = async () => {
    try {
      await axios.post('http://localhost:3000/books', { title: newBookTitle, author: newBookAuthor, description: newBookDescription }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchBooks();
      setNewBookTitle('');
      setNewBookAuthor('');
      setNewBookDescription('');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:3000/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const editBook = (bookId) => {
    setEditingBookId(bookId);
    const bookToEdit = books.find(book => book.id === bookId);
    setNewBookTitle(bookToEdit.title);
    setNewBookAuthor(bookToEdit.author);
    setNewBookDescription(bookToEdit.description);
  };

  const updateBook = async () => {
    try {
      await axios.patch(`http://localhost:3000/books/${editingBookId}`, { title: newBookTitle, author: newBookAuthor, description: newBookDescription }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
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

  const handleSearchTitle = (e) => {
    setSearchTermTitle(e.target.value);
    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(e.target.value.toLowerCase()) &&
      book.author.toLowerCase().includes(searchTermAuthor.toLowerCase())
    );
    setSearchResults(filteredBooks);
  };

  const handleSearchAuthor = (e) => {
    setSearchTermAuthor(e.target.value);
    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(searchTermTitle.toLowerCase()) &&
      book.author.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(filteredBooks);
  };

  const handleSearchUser = (e) => {
    setSearchTermUser(e.target.value);
    // Фильтрация пользователей по имени в реальном времени
    const filteredUsers = users.filter(user =>
      user.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <div>
        <h3>Users</h3>
        <input type="text" placeholder="Username" value={searchTermUser} onChange={handleSearchUser} />
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id}>
              {user.username} {user.isAdmin ? '(Admin)' : ''}
              {!user.isAdmin && <button onClick={() => makeAdmin(user.username)}>Make Admin</button>}
              {user.isAdmin && <button onClick={() => removeAdmin(user.username)}>Remove Admin</button>}
            </li>
          ))}
        </ul>
      </div>

      <h3>Add Book</h3>
      <input type="text" placeholder="Название" value={newBookTitle} onChange={(e) => setNewBookTitle(e.target.value)} />
      <input type="text" placeholder="Автор" value={newBookAuthor} onChange={(e) => setNewBookAuthor(e.target.value)} />
      <input type="text" placeholder="Текст книги" value={newBookDescription} onChange={(e) => setNewBookDescription(e.target.value)} />
      <button onClick={editingBookId ? updateBook : addBook}>{editingBookId ? 'Update Book' : 'Add Book'}</button>
      <h3>Search</h3>
      <p>Введите название книги:</p>
      <input type="text" placeholder="Название" value={searchTermTitle} onChange={handleSearchTitle} />
      <p>Введите автора книги:</p>
      <input type="text" placeholder="Автор" value={searchTermAuthor} onChange={handleSearchAuthor} />
      <h3>Books</h3>
      <ul>
        {searchResults.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
            <button onClick={() => deleteBook(book.id)}>Delete</button>
            <button onClick={() => editBook(book.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;