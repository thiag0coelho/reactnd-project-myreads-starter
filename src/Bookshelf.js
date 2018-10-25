import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import './styles/App.css';

class Bookshelf extends React.Component {
  handleUpdateBook = (book, shelf) => {
    const { onUpdateBook } = this.props;
    onUpdateBook(book, shelf);
  };

  render() {
    const { bookshelf, books } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          <span>
            {bookshelf.title}
            {' ('}
            {books.length || ''}
            {')'}
          </span>
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                {<Book
                  book={book}
                  onUpdateBook={this.handleUpdateBook}
                />}
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

Bookshelf.propTypes = {
  bookshelf: PropTypes.instanceOf(Object).isRequired,
  onUpdateBook: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(Object).isRequired,
};

export default Bookshelf;
