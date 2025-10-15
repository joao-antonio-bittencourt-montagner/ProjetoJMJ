import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login     from './pages/Login';
import Book      from './pages/Book';
import NovoLivro from './pages/NovoLivro';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/book" element={<Book />} />
        <Route path="/book/Adicionar/:bookId" element={<NovoLivro />} />
      </Routes>
    </BrowserRouter>
  );
}
