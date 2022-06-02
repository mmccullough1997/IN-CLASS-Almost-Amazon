import axios from 'axios';
import firebaseConfig from './apiKeys';

const dbUrl = firebaseConfig.databaseURL;

// READ - we need to modify endpoint to only GET logged in users stuff
// CREATE - we need to add UID to payload so when we GET we can index on uid
// UPDATE/DELETE - since user will only have access to their stuff on READ, should be able to UPDATE/DELETE what they can read

// GET ALL AUTHORS
const getAuthors = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="uid"&equalTo="${uid}"`) // look at postman
    .then((response) => {
      if (response.data) { // if there's data resolve an array
        resolve(Object.values(response.data)); // Object.values makes into an array of values
      } else { // if there's not data, resolve empty array
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// CREATE AUTHOR
const createAuthor = (authorObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, authorObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/authors/${response.data.name}.json`, payload)
        .then(() => {
          getAuthors(authorObj.uid).then(resolve);
        });
    }).catch(reject);
});

// GET SINGLE AUTHOR
const getSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// FILTER FAVORITE AUTHORS
const favoriteAuthors = (uid) => new Promise((resolve, reject) => {
  // axios.get(`${dbUrl}/authors.json?orderBy="favorite"&equalTo=true`) // look at postman
  //   .then((response) => resolve(Object.values(response.data)))
  //   .catch((error) => reject(error));
  getAuthors(uid)
    .then((userAuthors) => {
      const favAuthors = userAuthors.filter((author) => author.favorite);
      resolve(favAuthors);
    }).catch((error) => reject(error));
});

// DELETE AUTHOR
const deleteAuthor = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/authors/${firebaseKey}.json`)
    .then(() => {
      getAuthors(uid).then((authorsArray) => resolve(authorsArray));
    })
    .catch((error) => reject(error));
});

// UPDATE AUTHOR
const updateAuthor = (authorObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/authors/${authorObj.firebaseKey}.json`, authorObj) // update particular author with author object
    .then(() => getAuthors(authorObj.uid).then(resolve))
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
