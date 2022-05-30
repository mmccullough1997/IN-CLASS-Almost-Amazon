// import { deleteAuthor } from '../../api/authorData';
import { deleteBook, getSingleBook } from '../../api/bookData';
import { viewBookDetails, viewAuthorDetails, deleteAuthorBooks } from '../../api/mergedData';
import addBookForm from '../components/forms/addBookForm';
import { showAuthors } from '../components/pages/authors';
// import { showAuthors } from '../components/pages/authors';
import { showBooks } from '../components/pages/books';
import viewAuthor from '../components/pages/viewAuthor';
import viewBook from '../components/pages/viewBook';
import addAuthorForm from '../components/forms/addAuthorForm';
import { getSingleAuthor } from '../../api/authorData';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteBook(firebaseKey).then((booksArray) => showBooks(booksArray));
      }
    }

    // CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      console.warn('ADD BOOK');
      addBookForm();
    }

    // CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) { // if you click edit book button
      // console.warn('EDIT BOOK', e.target.id);
      // console.warn(e.target.id.split('--'));
      const [, firebaseKey] = e.target.id.split('--'); // find firebasekey
      getSingleBook(firebaseKey).then((bookObj) => addBookForm(bookObj)); // get single book from firebase key then add bookobj to books
    }

    // CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, bookFirebaseKey] = e.target.id.split('--');
      viewBookDetails(bookFirebaseKey).then((bookAuthorObject) => viewBook(bookAuthorObject));
    }

    // CLICK EVENT FOR VIEW AUTHOR DETAILS
    if (e.target.id.includes('view-author-btn')) {
      console.warn('VIEW AUTHOR BTN', e.target.id);
      const [, authorFirebaseKey] = e.target.id.split('--');
      viewAuthorDetails(authorFirebaseKey).then((bookAuthorObject) => viewAuthor(bookAuthorObject));
    }

    // // ADD CLICK EVENT FOR DELETING AN AUTHOR - OLD WAY
    // if (e.target.id.includes('delete-author-btn')) {
    //   // eslint-disable-next-line no-alert
    //   if (window.confirm('Want to delete?')) {
    //     const [, firebaseKey] = e.target.id.split('--');
    //     deleteAuthor(firebaseKey).then((authorsArray) => showAuthors(authorsArray));
    //   }
    // }

    // ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteAuthorBooks(firebaseKey).then(showAuthors); // shorthand for following line
        // deleteAuthorBooks(firebaseKey).then((newAuthorsArray) => showAuthors(newAuthorsArray)); // delete author's books then show authors with new array
      }
    }

    // ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      console.warn('ADD AUTHOR');
      addAuthorForm();
    }

    // ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('edit-author-btn')) { // if you click update author button
      // console.warn('EDIT AUTHOR', e.target.id);
      // console.warn(e.target.id.split('--'));
      const [, firebaseKey] = e.target.id.split('--'); // find firebasekey
      getSingleAuthor(firebaseKey).then((authorObj) => addAuthorForm(authorObj)); // get single book from firebase key then add bookobj to books
    }
  });
};

export default domEvents;
