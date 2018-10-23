import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
          <span />
          <Select color="#60ac5d" onChange={this.handleUpdateBook} className="book-shelf-changer" value={book.shelf ? book.shelf : 'none'}>
            <MenuItem value="move" disabled>Move to...</MenuItem>
            <MenuItem value="currentlyReading">Currently Reading</MenuItem>
            <MenuItem value="wantToRead">Want to Read</MenuItem>
            <MenuItem value="read">Read</MenuItem>
            <MenuItem value="none">None</MenuItem>
          </Select>
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
