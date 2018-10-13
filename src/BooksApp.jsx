import React from 'react';
import { Route } from 'react-router-dom';
import BooksList from './BooksList';
import Search from './Search';
import './App.css';


class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' component={BooksList}/>
        <Route path='/search' component={Search}/>
      </div>
    )
  }
}

export default BooksApp;
