const titleInput = document.querySelector('.book-title');
const authorInput = document.querySelector('.book-author');
const bookList = document.querySelector('.book-list');
const addBtn = document.querySelector('.add-btn');
const listLink = document.querySelector('.list-link');
const addLink = document.querySelector('.add-new-link');
const contactLink = document.querySelector('.contact-link');
const listCon = document.querySelector('.list-con');
const contactCon = document.querySelector('.contact');
const formCon = document.querySelector('.form-con');

addLink.addEventListener('click', () => {
  listCon.classList.add('disapear');
  formCon.classList.remove('disapear');
  contactCon.classList.add('disapear');
});

listLink.addEventListener('click', () => {
  listCon.classList.remove('disapear');
  formCon.classList.add('disapear');
  contactCon.classList.add('disapear');
});

contactLink.addEventListener('click', () => {
  listCon.classList.add('disapear');
  formCon.classList.add('disapear');
  contactCon.classList.remove('disapear');
});

class BookShelf {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

let bookArray = [];

class ShowBooks {
  static addBooks(title, author) {
    const bookTitle = title;
    const bookAuthor = author;
    if (bookTitle !== '' && bookAuthor !== '') {
      const arrayObj = new BookShelf(bookTitle, bookAuthor);
      bookArray.push(arrayObj);
      localStorage.setItem('Books', JSON.stringify(bookArray));
    }
  }

  static showBook() {
    const books = ShowBooks.checkLocalStorage();
    let showBook = '';
    books.forEach((book, i) => {
      showBook += `
        <div class="book-space">
          <div class="book-des">
            <p>"${book.title}"</p>
            <p>by</p>
            <p>${book.author}</p>
          </div>
          <button class="remove" onclick="ShowBooks.remove(${i})">Remove</button>
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

  static remove(selector) {
    const bookIndex = selector;
    bookArray.splice(bookIndex, 1);
    localStorage.setItem('Books', JSON.stringify(bookArray));
    ShowBooks.showBook();
  }
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  ShowBooks.addBooks(title, author);
  ShowBooks.showBook();
  titleInput.value = '';
  authorInput.value = '';
});

window.addEventListener('DOMContentLoaded', () => {
  ShowBooks.showBook();
});