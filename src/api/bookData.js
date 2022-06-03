import axios from 'axios';
import firebaseConfig from './apiKeys';
// API CALLS FOR BOOKS

const dbUrl = firebaseConfig.databaseURL;

// READ - we need to modify endpoint to only GET logged in users stuff
// CREATE - we need to add UID to payload so when we GET we can index on uid
// UPDATE/DELETE - since user will only have access to their stuff on READ, should be able to UPDATE/DELETE what they can read

// GET BOOKS - allow for no books
const getBooks = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="uid"&equalTo="${uid}"`) // get books specific to userId
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data)); // Object.values makes into an array of values
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// DELETE BOOK
const deleteBook = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/books/${firebaseKey}.json`)
    .then(() => {
      // getBooks(uid).then((booksArray) => resolve(booksArray)); long hand for next line
      getBooks(uid).then(resolve);
    })
    .catch((error) => reject(error));
});

// we need to call to get updated books also delete in postman returns null

// GET SINGLE BOOK
const getSingleBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// CREATE BOOK
const createBook = (bookObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/books.json`, bookObj) // take book object to create, when you send, you get back a name = firebase id
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/books/${response.data.name}.json`, payload) // update book with firebaseKey and uid
        .then(() => {
          getBooks(bookObj.uid).then(resolve); // get all books with new data
        });
    }).catch(reject);
});

// UPDATE BOOK
const updateBook = (bookObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/books/${bookObj.firebaseKey}.json`, bookObj) // update particular book with bookObj
    .then(() => getBooks(bookObj.uid).then(resolve))
    .catch(reject);
});

// FILTER BOOKS ON SALE
const booksOnSale = (uid) => new Promise((resolve, reject) => {
  getBooks(uid)
    .then((userBooks) => {
      const saleBooks = userBooks.filter((book) => book.sale);
      resolve(saleBooks);
    }).catch((error) => reject(error));
});

// // TODO: STRETCH...SEARCH BOOKS
// const searchBooksByTitle = (uid, title) => new Promise((resolve, reject) => {
//   // axios.get(`${dbUrl}/books.json?orderBy="title"&equalTo="${bookObj.title}"&orderBy="uid"&equalTo="${uid}"`)
//   //   .then((response) => resolve(Object.values(response.data)))
//   //   .catch(reject);
//   // axios.get(`${dbUrl}/books.json?orderBy="uid"&equalTo="${uid}"`)
//   //   .then(() => {
//   //     axios.get(`${dbUrl}/books.json?orderBy="title"&equalTo="${title}"`)
//   //       .then((searchedBook) => {
//   //         resolve(Object.values(searchedBook));
//   //       }).catch((error) => reject(error));
//   //   });
//   getBooks(uid)
//     .then
// });

export {
  getBooks,
  createBook,
  booksOnSale,
  deleteBook,
  getSingleBook,
  updateBook,
};
