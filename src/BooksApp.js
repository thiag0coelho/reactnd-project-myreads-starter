import React from 'react';
import { Route } from 'react-router-dom';
import BookshelfList from './BookshelfList';
import Search from './Search';
import * as BooksAPI from './helpers/BooksAPI';
import './styles/App.css';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      books: [],
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.getAll = this.getAll.bind(this);
    this.isLoading = this.isLoading.bind(this);
    this.handleUpdateBook = this.handleUpdateBook.bind(this);
    this.updateBookLocal = this.updateBookLocal.bind(this);
    this.getBookFromShelf = this.getBookFromShelf.bind(this);
  }

  async componentDidMount() {
    const { getAll } = this;

    await getAll();
  }

  async getAll() {
    const { isLoading } = this;

    await isLoading(true);
    const books = await BooksAPI.getAll();
    await this.setState({ books });
    await isLoading(false);
  }

  getBookFromShelf = (id) => {
    const { books } = this.state;

    return books.find(book => book.id === id).shelf;
  }

  async updateBookLocal(book, shelf) {
    const { books } = this.state;
    const updatedBooks = books.map((mBook) => {
      if (mBook.id === book.id) {
        mBook.shelf = shelf;
      }
      return mBook;
    });
    await this.setState({ books: updatedBooks });
  }

  async handleUpdateBook(book, shelf) {
    const { isLoading, updateBookLocal } = this;

    await isLoading(true);
    await updateBookLocal(book, shelf);
    await BooksAPI.update(book, shelf);
    await isLoading(false);
  }

  async isLoading(stats) {
    await this.setState({ loading: stats });
  }

  render() {
    const { getAll, handleUpdateBook } = this;
    const { books, loading } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookshelfList
              onUpdateBook={handleUpdateBook}
              onGetAll={getAll}
              loading={loading}
              books={books}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <Search
              onUpdateBook={handleUpdateBook}
              loading={loading}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
