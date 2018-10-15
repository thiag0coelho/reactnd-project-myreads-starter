import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

function getAuthors(book) {
  return `${book.authors.join(', ')}`;
}

const Book = ({ book }) => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ backgroundImage: `url("${book.imageLinks.thumbnail}")` }} />
      <div className="book-shelf-changer">
        <select>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{book.title}</div>
    <div className="book-authors">{getAuthors(book)}</div>
  </div>
);

Book.propTypes = {
  book: PropTypes.instanceOf(Object).isRequired,
};

export default Book;
