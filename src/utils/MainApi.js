import Api from './Api';

class MainApi extends Api {
  _setupError(err) {
    const error = new Error(err);
    switch (err.status) {
      case 401:
        error.message = 'Incorrect email or password.';
        break;
      case 400:
        error.message = 'Form was filled incorrectly.';
        break;
      case 409:
        error.message = 'Email is already in use.';
        break;
      default:
        error.message =
          'Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.';
    }
    return Promise.reject(error);
  }

  signupUser(userInfo) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(userInfo),
    })
      .then(this._checkServerResponse)
      .catch(this._setupError);
  }

  signinUser(userInfo) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(userInfo),
    })
      .then(this._checkServerResponse)
      .catch(this._setupError);
  }

  checkUserValidity(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkServerResponse);
  }

  createArticle(article) {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(article),
    }).then(this._checkServerResponse);
  }

  getSavedArticles() {
    return fetch(`${this._baseUrl}/articles`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._checkServerResponse);
  }

  deleteArticle(articleId) {
    return fetch(`${this._baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._checkServerResponse);
  }
}

const mainApi = new MainApi({
  baseUrl: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
