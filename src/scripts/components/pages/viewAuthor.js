import clearDom from '../../helpers/clearDom';
import renderToDOM from '../../helpers/renderToDom';
import { viewAuthorDetails } from '../../../api/mergedData';

const viewAuthor = (obj) => {
  clearDom();

  const domString = `
  <div class="mt-5 d-flex flex-wrap">
   <div class="d-flex flex-column">
     <img src=${obj.image} alt=""style="width: 300px;">
     <div class="mt-5">
     <i class="fas fa-edit btn btn-info" id="update-author--${obj.firebaseKey}"></i>
     <i class="btn btn-danger fas fa-trash-alt" id="delete-author-btn--${obj.firebaseKey}"></i>
     </div>
   </div>
   <div class="text-white ms-5 details">
     <h5>${obj.first_name} ${obj.last_name} ${obj.favorite ? '<span class="badge"><i class="far fa-heart heart"></i> Favorite</span>' : ''}</h5>
     Author Email: <a href="mailto:${obj.email}">${obj.email}</a>
     <p>${obj.description || ''}</p>
     <hr>
     <div id="authorBooks"></div>
     `;

  const books = Object.values(obj.bookObj); // book array
  let bookString = '';
  if (books.length === 0) {
    bookString = '<h5>No books from this author.</h5>';
  } else {
    books.forEach((book) => {
      bookString += `
        <div class="mt-5 d-flex flex-wrap">
       <div class="d-flex flex-column">
         <img src=${book.image} alt=${book.title} style="width: 300px;">
       </div>
       <div class="text-white ms-5 details">
         <h5>${book.title} by ${obj.first_name} ${obj.last_name} ${obj.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
         <p>${book.description || ''}</p>
         <hr>
         <p>${book.sale ? `<span class="badge bg-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> 
           $${book.price}` : `$${book.price}`}</p>      
          </div>
        </div>
        `;
    });
  }

  console.warn(viewAuthorDetails('-N31jK9nqmgI9e1mxtuW'));
  renderToDOM('#view', domString);
  renderToDOM('#authorBooks', bookString);
};

export default viewAuthor;
