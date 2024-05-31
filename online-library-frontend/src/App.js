// Импортируем необходимые библиотеки и компоненты
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/auth/Auth';
import BookList from './pages/books/BookList';
import BookDetail from './pages/books/BookDetail';
import Collection from './pages/collection/Collection';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import AdminPanel from './pages/admin-panel/AdminPanel';
import { AuthProvider } from './components/AuthContext';

// Главный компонент приложения
function App() {
  return (
    // Обеспечиваем доступ к контексту авторизации для всех компонентов
    <AuthProvider>
      <Router>
        <div>
          {/* Шапка сайта */}
          <Header />
          {/* Определение маршрутов */}
          <Routes>
            {/* Маршрут страницы авторизации */}
            <Route path="/auth" element={<Auth />} />
            {/* Маршрут списка книг, доступен только авторизованным пользователям */}
            <Route path="/books" element={<PrivateRoute><BookList /></PrivateRoute>} />
            {/* Маршрут админ-панели, доступен только администраторам */}
            <Route path="/admin" element={<PrivateRoute adminOnly={true}><AdminPanel /></PrivateRoute>} />
            {/* Маршрут страницы подробной информации о книге, доступен только авторизованным пользователям */}
            <Route path="/book/:id" element={<PrivateRoute><BookDetail /></PrivateRoute>} />
            {/* Маршрут коллекции книг, доступен только авторизованным пользователям */}
            <Route path="/collection" element={<PrivateRoute adminOnly={false}><Collection /></PrivateRoute>} />
            {/* Корневой маршрут перенаправляет на страницу авторизации */}
            <Route path="/" element={<Auth />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
