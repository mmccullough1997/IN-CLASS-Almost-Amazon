// allows to pull functions you need to avoid a dependency cycle - think of bridge table
// promise chaining
import { getSingleAuthor, getSingleAuthorsBooks } from './authorData';
import { getSingleBook } from './bookData';

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
          resolve({ bookObj, ...authorObject }); // spread operator - unpacks keys from book object ands
        });
    }).catch((error) => reject(error));
});

export { viewBookDetails, viewAuthorDetails };
