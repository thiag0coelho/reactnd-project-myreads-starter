import React from 'react';
import { Route } from 'react-router-dom';
import BookshelfList from './BookshelfList';
import Search from './Search';
import './App.css';

const BooksApp = () => (
  <div className="app">
    <Route exact path="/" component={BookshelfList} />
    <Route path="/search" component={Search} />
  </div>
);

export default BooksApp;
