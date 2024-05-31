// src/components/BookDetail.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddToCollectionButton from '../collection/AddToCollectionButton';
import AuthContext from '../../components/AuthContext';

function BookDetail() {
  const { token } = useContext(AuthContext);
  const [book, setBook] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(`http://localhost:3000/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBook(response.data);
    };
    fetchBook();
  }, [id]);

  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <AddToCollectionButton bookId={id} />
    </div>
  );
}

export default BookDetail;
