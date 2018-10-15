import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import * as BooksAPI from './BooksAPI';
import './App.css';

const getRandomId = () => Math.random().toString(36).substring(7);

class BookshelfList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books,
        }));
      });
  }

  getBooksFromShelf(bookshelf) {
    const { books } = this.state;

    return books.filter(x => x.shelf === bookshelf.name);
  }

  render() {
    const { bookshelfList } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookshelfList.map(bookshelf => (
              <Bookshelf
                key={bookshelf.id}
                bookshelfTitle={bookshelf.title}
                books={this.getBooksFromShelf(bookshelf)}
              />
            ))}
          </div>
        </div>
        <div className="open-search"><Link to="/search">Add a book</Link></div>
      </div>
    );
  }
}

export default BookshelfList;
