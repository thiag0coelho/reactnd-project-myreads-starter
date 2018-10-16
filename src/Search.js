import React from 'react';
import { Link } from 'react-router-dom';
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

    this.handleChange = this.handleChange.bind(this);
  }

  getBook(query) {
    if (query && query.length > 1) {
      BooksAPI.search(query)
        .then((booksSearched) => {
          this.setState(() => ({
            booksSearched: booksSearched.error ? booksSearched.items : booksSearched,
          }));
        });
    }
  }

  handleChange(event) {
    this.setState({
      query: event.target.value,
    },
    (this.getBook(event.target.value)));
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
                {<Book book={book} />}
              </li>
            )) }
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
