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
      booksSearched: [],
      query: '',
      queryHasError: false,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.getAll = this.getAll.bind(this);
    this.isLoading = this.isLoading.bind(this);
    this.handleUpdateBook = this.handleUpdateBook.bind(this);
    this.updateBookLocal = this.updateBookLocal.bind(this);
    this.getBooksSearched = this.getBooksSearched.bind(this);
  }

  async componentDidMount() {
    const { getAll } = this;

    await getAll();
  }

  getBookFromShelf = (id) => {
    const { books } = this.state;

    const returnBook = books.find(book => book.id === id);

    return returnBook;
  }

  async getBooksSearched(query) {
    const { isLoading, getBookFromShelf } = this;

    await this.setState({ query });

    if (!query || query.length < 2) {
      this.setState(() => ({
        booksSearched: [],
        queryHasError: false,
        loading: false,
      }));
      return;
    }

    await isLoading(true);

    const booksSearched = await BooksAPI.search(query);

    await this.setState({
      booksSearched: booksSearched.error ? [] : booksSearched.map((book) => {
        const bookFromShelf = getBookFromShelf(book.id);
        book.shelf = bookFromShelf ? bookFromShelf.shelf || 'none' : 'none';
        return book;
      }),
      queryHasError: booksSearched.error,
      loading: false,
    });
  }

  async getAll() {
    const { isLoading } = this;

    await isLoading(true);
    const books = await BooksAPI.getAll();
    await this.setState({ books });
    await isLoading(false);
  }

  async isLoading(stats) {
    await this.setState({ loading: stats });
  }

  async handleUpdateBook(book, shelf) {
    const { isLoading, updateBookLocal } = this;

    await isLoading(true);
    await updateBookLocal(book, shelf);
    await BooksAPI.update(book, shelf);
    await isLoading(false);
  }

  async updateBookLocal(book, shelf) {
    const { books, getBookFromShelf } = this.state;

    const bookFromShelf = getBookFromShelf(book.id);

    if (bookFromShelf) {
      const updatedBooks = books.map((mBook) => {
        if (mBook.id === book.id) {
          mBook.shelf = shelf;
        }
        return mBook;
      });
      await this.setState({ books: updatedBooks });
    }
  }

  render() {
    const { getAll, handleUpdateBook, getBooksSearched } = this;
    const {
      books, loading, booksSearched,
      query, queryHasError,
    } = this.state;

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
              onBooksSearch={getBooksSearched}
              loading={loading}
              booksSearched={booksSearched}
              query={query}
              queryHasError={queryHasError}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
