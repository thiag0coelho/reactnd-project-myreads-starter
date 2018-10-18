import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf';
import Spinner from './Components/Spinner';
import * as BooksAPI from './BooksAPI';
import './App.css';

const getRandomId = () => Math.random().toString(36).substring(7);

class BookshelfList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      books: [],
      bookshelfList: [
        {
          title: 'Currently Reading',
          name: 'currentlyReading',
          id: getRandomId(),
        },
        {
          title: 'Want to Read',
          name: 'wantToRead',
          id: getRandomId(),
        },
        {
          title: 'Read',
          name: 'read',
          id: getRandomId(),
        },
      ],
    };
  }

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    this.setState(() => ({
      loading: true,
    }));
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books,
          loading: false,
        }));
      });
  }

  getBooksFromShelf = (bookshelf) => {
    const { books } = this.state;

    return books.filter(x => x.shelf === bookshelf.name);
  }

  handleUpdateBook = (book, shelf) => {
    const { onUpdateBook } = this.props;

    onUpdateBook(book, shelf)
      .then(this.getAll);
  }

  render() {
    const { bookshelfList, loading } = this.state;

    return (
      <div className="list-books">
        <Spinner loading={loading} />
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookshelfList.map(bookshelf => (
              <Bookshelf
                key={bookshelf.id}
                bookshelf={bookshelf}
                books={this.getBooksFromShelf(bookshelf)}
                onUpdateBook={this.handleUpdateBook}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

BookshelfList.propTypes = {
  onUpdateBook: PropTypes.func.isRequired,
};

export default BookshelfList;
