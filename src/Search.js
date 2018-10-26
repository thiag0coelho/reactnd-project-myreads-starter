import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import TextField from '@material-ui/core/TextField';
import Spinner from './components/Spinner';
import Book from './Book';
import './styles/App.css';

class Search extends React.PureComponent {
  handleChange = (event) => {
    const { onBooksSearch } = this.props;

    onBooksSearch(event.target.value);
  }

  handleUpdateBook = (book, shelf) => {
    const { onUpdateBook } = this.props;

    onUpdateBook(book, shelf);
  }

  render() {
    const { loading, booksSearched, query } = this.props;
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
              onChange={this.handleChange}
              autoFocus
              value={query}
              fullWidth
              element={TextField}
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
  onBooksSearch: PropTypes.func.isRequired,
  booksSearched: PropTypes.arrayOf(Object).isRequired,
  query: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Search;
