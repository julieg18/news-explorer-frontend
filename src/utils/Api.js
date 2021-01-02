class Api {
  constructor({ baseUrl, headers = {} }) {
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
}

export default Api;
