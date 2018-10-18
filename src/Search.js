import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import './App.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksSearched: [],
      query: '',
    };
  }

  getBooks = (query) => {
    if (query && query.length > 1) {
      BooksAPI.search(query)
        .then((booksSearched) => {
          this.setState(() => ({
            booksSearched: booksSearched.error ? booksSearched.items : booksSearched,
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

    onUpdateBook(book, shelf);
  }

  render() {
    const { booksSearched, query } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleChange}
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
