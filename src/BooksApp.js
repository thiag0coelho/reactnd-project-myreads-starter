import React from 'react';
import { Route } from 'react-router-dom';
import BookshelfList from './BookshelfList';
import Search from './Search';
import * as BooksAPI from './helpers/BooksAPI';
import './styles/App.css';

const handleUpdateBook = (book, shelf) => BooksAPI.update(book, shelf);

const BooksApp = () => (
  <div className="app">
    <Route
      exact
      path="/"
      render={() => (
        <BookshelfList onUpdateBook={handleUpdateBook} />
      )}
    />
    <Route
      path="/search"
      render={() => (
        <Search onUpdateBook={handleUpdateBook} />
      )}
    />
  </div>
);

export default BooksApp;
