import clearDom from '../../helpers/clearDom';
import renderToDOM from '../../helpers/renderToDom';

const addAuthorForm = (obj = {}) => {
  clearDom();
  const domString = `
    <form id="${obj.firebaseKey ? `update-author--${obj.firebaseKey}` : 'submit-author'}" class="mb-4">
      <div class="form-group">
        <label for="first_name">First Name</label>
        <input type="text" class="form-control" id="first_name" placeholder="First Name" value="${obj.first_name || ''}" required>
      </div>
      <div class="form-group">
        <label for="last_name">Last Name</label>
        <input type="text" class="form-control" id="last_name" placeholder="Last Name" value="${obj.last_name || ''}" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" aria-describedby="Email" placeholder="Enter Email" value="${obj.email || ''}" >
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input type="text" class="form-control" id="image" placeholder="Image" value="${obj.image || ''}">
      </div>
      <div class="form-check">
      <input type="checkbox" class="form-check-input" id="favorite" ${obj.favorite ? 'checked' : ''}>
      <label class="form-check-label" for="favorite">Favorite?</label>
    </div>
      <button type="submit" class="btn btn-primary mt-3">Submit Author</button>
    </form>`;

  renderToDOM('#form-container', domString);
};

export default addAuthorForm;
