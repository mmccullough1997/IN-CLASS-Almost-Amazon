import { booksOnSale, getBooks } from '../../api/bookData';
import { showBooks } from '../components/pages/books';
import signOut from '../helpers/auth/signOut';
import { showAuthors } from '../components/pages/authors';
import { favoriteAuthors, getAuthors } from '../../api/authorData';

// navigation events
const navigationEvents = (uid) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale(uid).then((saleBooksArray) => showBooks(saleBooksArray)); // saleBooksArray is a taco
  });

  // ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks(uid).then((booksArray) => showBooks(booksArray)); // booksArray is a taco
  });

  // STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors(uid).then((authorsArray) => showAuthors(authorsArray));
  });

  // FAVORITE AUTHORS
  document.querySelector('#favoriteAuthors').addEventListener('click', () => {
    favoriteAuthors(uid).then((favoriteAuthorsArray) => showAuthors(favoriteAuthorsArray)); // taco
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();
    console.warn(searchValue);

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
      // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
      // OTHERWISE SHOW THE STORE
      // searchBooksByTitle(uid, searchValue).then((searchedBook) => showBooks(searchedBook));

      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
