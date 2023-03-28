/* eslint-disable no-use-before-define */
const title = document.querySelector('.book-title');
const author = document.querySelector('.book-author');
const bookList = document.getElementsByClassName('book-list')[0];
const addBtn = document.getElementsByClassName('add-btn')[0];
let bookArray = [];

function addBooks(title, author) {
  if (title !== '' && author !== '') {
    const arrayObj = {
      Title: title,
      Author: author,
    };
    bookArray.push(arrayObj);
    localStorage.setItem('Books', JSON.stringify(bookArray));
  }
}

function showBook() {
  checkLocalStorage();
  let showBook = '';
  bookArray.forEach((book, i) => {
    showBook += `
      <div>
        <p>${book.Title}</p>
        <p>${book.Author}</p>
        <button class = "remove" onclick = "remove(${i})">Remove</button>
      </div>
    `;
  });
  bookList.innerHTML = showBook;
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.querySelector('.book-title').value.trim();
  const author = document.querySelector('.book-author').value.trim();
  addBooks(title, author);
  showBook();
  title.value = '';
  author.value = '';
});

const remove = (id) => {
  const bookIndex = bookArray.findIndex((item, i) => id === i);
  bookArray.splice(bookIndex, 1);
  localStorage.setItem('Books', JSON.stringify(bookArray));
  showBook();
};

function checkLocalStorage() {
  if (localStorage.getItem('Books') == null) {
    bookArray = [];
  } else {
    bookArray = JSON.parse(localStorage.getItem('Books'));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  showBook();
});
