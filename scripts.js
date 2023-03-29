/* eslint-disable no-use-before-define */
const title = document.querySelector('.book-title');
const author = document.querySelector('.book-author');
const bookList = document.getElementsByClassName('book-list')[0];
const addBtn = document.getElementsByClassName('add-btn')[0];

class BookShelf {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

let bookArray = [];

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.querySelector('.book-title').value.trim();
  const author = document.querySelector('.book-author').value.trim();
  ShowBooks.addBooks(title, author);
  ShowBooks.showBook();
  title.value = '';
  author.value = '';
});

class ShowBooks {

  static addBooks = (title, author) => {
    const bookTitle = title.value;
    const bookAuthor = author.value;
    if (bookTitle !== '' && bookAuthor !== '') {
      const arrayObj = new BookShelf(bookTitle, bookAuthor);
      const books = ShowBooks.checkLocalStorage();
      bookArray.push(arrayObj);
      localStorage.setItem('Books', JSON.stringify(bookArray));
    }
  }

  static showBook() {
    const books = ShowBooks.checkLocalStorage();
    let showBook = '';
    bookArray.forEach((book, i) => {
      showBook += `
        <div class="book-space">
          <div class="book-des">
            <p>"${book.Title}"</p>
            <p>by</p>
            <p>${book.Author}</p>
          </div>
          <button class="remove" onclick = "remove(${i})">Remove</button>
        </div>
      `;
    });
    bookList.innerHTML = showBook;
  }

  static checkLocalStorage() {
    if (localStorage.getItem('Books') == null) {
      bookArray = [];
    } else {
      bookArray = JSON.parse(localStorage.getItem('Books'));
    }
    return bookArray;
  }

  static remove = (selector) => {
    const bookIndex = bookArray.findIndex((item, i) => selector === i);
    bookArray.splice(bookIndex, 1);
    localStorage.setItem('Books', JSON.stringify(bookArray));
    ShowBooks.showBook();
  };
}


window.addEventListener('DOMContentLoaded', () => {
  ShowBooks();
});
