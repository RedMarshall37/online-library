// src/App.js
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/books" element={<PrivateRoute><BookList /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute adminOnly={true}><AdminPanel /></PrivateRoute>} />
            <Route path="/book/:id" element={<PrivateRoute><BookDetail /></PrivateRoute>} />
            <Route path="/collection" element={<PrivateRoute adminOnly={false}><Collection /></PrivateRoute>} />
            <Route path="/" element={<Auth />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
