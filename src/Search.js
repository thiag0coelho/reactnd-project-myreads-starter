import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import Spinner from './Components/Spinner';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import './App.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      booksSearched: [],
      query: '',
    };
  }

  getBooks = (query) => {
    if (query && query.length > 1) {
      this.isLoading(true);
      BooksAPI.search(query)
        .then((booksSearched) => {
          this.setState(() => ({
            booksSearched: booksSearched.error ? booksSearched.items : booksSearched,
            loading: false,
          }));
        });
    } else {
      this.setState(() => ({
        booksSearched: [],
      }));
    }
  }

  handleChange = (event) => {
    this.setState({
      query: event.target.value,
    },
      (this.getBooks(event.target.value)));
  }

  handleUpdateBook = (book, shelf) => {
    const { onUpdateBook } = this.props;

    this.isLoading(true);
    onUpdateBook(book, shelf)
      .then(() => {
        setTimeout(() => {
          this.isLoading(false);
        }, 300);
      });
  }

  isLoading = stats => this.setState(() => ({ loading: stats }));

  render() {
    const { booksSearched, query, loading } = this.state;
    return (
      <div className="search-books">
        <Spinner loading={loading} />
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleChange}
              autofocus=""
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { booksSearched.map(book => (
              <li key={book.id}>
                {<Book
                  book={book}
                  onUpdateBook={this.handleUpdateBook}
                />}
              </li>
            )) }
          </ol>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  onUpdateBook: PropTypes.func.isRequired,
};

export default Search;
