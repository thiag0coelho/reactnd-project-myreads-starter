import React from 'react';
import ReactDOM from 'react-dom';
import BooksApp from './BooksApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BooksApp />, div);
})


