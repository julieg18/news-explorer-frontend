class AuthApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    const error = new Error(res.status);
    error.status = res.status;
    return Promise.reject(error);
  }

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
}

const authApi = new AuthApi({
  baseUrl: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authApi;
