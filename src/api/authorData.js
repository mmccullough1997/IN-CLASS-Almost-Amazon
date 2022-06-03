import axios from 'axios';
import firebaseConfig from './apiKeys';

const dbUrl = firebaseConfig.databaseURL;

// READ - we need to modify endpoint to only GET logged in users stuff
// CREATE - we need to add UID to payload so when we GET we can index on uid
// UPDATE/DELETE - since user will only have access to their stuff on READ, should be able to UPDATE/DELETE what they can read

// GET ALL AUTHORS
const getAuthors = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="uid"&equalTo="${uid}"`) // get authors according to corresponding uid
    .then((response) => {
      if (response.data) { // if there's data resolve an array
        resolve(Object.values(response.data)); // Object.values makes into an array of values
      } else { // if there's not data, resolve empty array
        resolve([]);
      }
    })
    .catch((error) => reject(error)); // reject
});

// CREATE AUTHOR
const createAuthor = (authorObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, authorObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name }; // returns when you create author
      axios.patch(`${dbUrl}/authors/${response.data.name}.json`, payload) // patch with firebase id
        .then(() => {
          getAuthors(authorObj.uid).then(resolve); // get authors with specific uid
        });
    }).catch(reject);
});

// GET SINGLE AUTHOR
const getSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors/${firebaseKey}.json`) // get specific author according to firebase id
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// FILTER FAVORITE AUTHORS
const favoriteAuthors = (uid) => new Promise((resolve, reject) => {
  // axios.get(`${dbUrl}/authors.json?orderBy="favorite"&equalTo=true`) // look at postman
  //   .then((response) => resolve(Object.values(response.data)))
  //   .catch((error) => reject(error));
  getAuthors(uid) // get authors according to uid
    .then((userAuthors) => {
      const favAuthors = userAuthors.filter((author) => author.favorite); // filter uid authors that are favorited
      resolve(favAuthors);
    }).catch((error) => reject(error));
});

// DELETE AUTHOR
const deleteAuthor = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/authors/${firebaseKey}.json`) // delete specific authors according to firebase id
    .then(() => {
      getAuthors(uid).then((authorsArray) => resolve(authorsArray)); // get remaining user authors
    })
    .catch((error) => reject(error));
});

// UPDATE AUTHOR
const updateAuthor = (authorObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/authors/${authorObj.firebaseKey}.json`, authorObj) // update particular author with author object
    .then(() => getAuthors(authorObj.uid).then(resolve)) // get all uid-associated authors
    .catch(reject);
});

// GET A SINGLE AUTHOR'S BOOKS
const getSingleAuthorsBooks = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="author_id"&equalTo="${firebaseKey}"`) // look at postman
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export {
  getAuthors,
  createAuthor,
  getSingleAuthor,
  favoriteAuthors,
  deleteAuthor,
  updateAuthor,
  getSingleAuthorsBooks,
};
