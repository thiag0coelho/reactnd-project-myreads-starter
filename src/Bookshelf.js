import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import './App.css';

class Bookshelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { bookshelfTitle, books } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                {<Book book={book} />}
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

Bookshelf.propTypes = {
  bookshelfTitle: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(Object).isRequired,
};

export default Bookshelf;
