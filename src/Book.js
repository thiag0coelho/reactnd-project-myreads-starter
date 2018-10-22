import React from 'react';
import PropTypes from 'prop-types';
import './styles/App.css';

class Book extends React.Component {
  getAuthors = book => `${book.authors ? book.authors.join(', ') : ''}`;

  getCategories = book => `${book.categories ? book.categories.join(', ') : ''}`;

  handleUpdateBook = (event) => {
    const { onUpdateBook, book } = this.props;
    onUpdateBook(book, event.target.value);
  }

  render() {
    const { book } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ backgroundImage: book.imageLinks && `url("${book.imageLinks.thumbnail}")` }}
            title={`Title: ${book.title}\nAuthors: ${this.getAuthors(book)}\nRating: ${book.averageRating ? book.averageRating : ''}\nCategories: ${this.getCategories(book)}`}
          />
          <div className="book-shelf-changer">
            <select onChange={this.handleUpdateBook} value={book.shelf ? book.shelf : 'none'}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {book.title}
        </div>
        <div className="book-authors">
          {this.getAuthors(book)}
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.instanceOf(Object).isRequired,
  onUpdateBook: PropTypes.func.isRequired,
};

export default Book;
