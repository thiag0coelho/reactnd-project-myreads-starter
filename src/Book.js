import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

class Book extends React.Component {
  getAuthors = book => `${book.authors.join(', ')}`;

  handleUpdateBook = (event) => {
    const { onUpdateBook, book } = this.props;
    onUpdateBook(book, event.target.value);
  }

  render() {
    const { book } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ backgroundImage: `url("${book.imageLinks.thumbnail}")` }} />
          <div className="book-shelf-changer">
            <select onChange={this.handleUpdateBook}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{this.getAuthors(book)}</div>
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.instanceOf(Object).isRequired,
  onUpdateBook: PropTypes.func.isRequired,
};

export default Book;
