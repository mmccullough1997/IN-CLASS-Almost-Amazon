// allows to pull functions you need to avoid a dependency cycle - think of bridge table
// promise chaining
import { getSingleAuthor, getSingleAuthorsBooks, deleteAuthor } from './authorData';
import { deleteBook, getSingleBook } from './bookData';

const viewBookDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebaseKey)
    .then((bookObject) => {
      getSingleAuthor(bookObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject }); // spread operator - unpacks keys from book object and makes them siblings
        });
    }).catch((error) => reject(error));
});

const viewAuthorDetails = (authorFirebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(authorFirebaseKey)
    .then((authorObject) => {
      getSingleAuthorsBooks(authorObject.firebaseKey)
        .then((bookObj) => {
          resolve({ bookObj, ...authorObject }); // spread operator - unpacks keys from author object
        });
    }).catch((error) => reject(error));
});

const deleteAuthorBooks = (authorId) => new Promise((resolve, reject) => { // new function takes author id
  getSingleAuthorsBooks(authorId).then((bookObj) => { // returns bookObj
    // console.warn(bookObj, 'Author Books');
    const booksArray = Object.values(bookObj); // make bookObj an array
    // console.warn(booksArray);
    const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey)); // deletes books related to author
    // console.warn(deleteBookPromises);
    Promise.all(deleteBookPromises).then(() => {
      deleteAuthor(authorId).then(resolve); // when you get all books from an author, then delete that particular author
    });
  }).catch((error) => reject(error));
});

export { viewBookDetails, viewAuthorDetails, deleteAuthorBooks };
