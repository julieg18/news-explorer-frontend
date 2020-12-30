class ArticlesApi {
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

  createArticle(article) {
    return fetch(`${this._baseUrl}`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(article),
    }).then(this._checkServerResponse);
  }

  getSavedArticles() {
    return fetch(`${this._baseUrl}`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._checkServerResponse);
  }

  deleteArticle(articleId) {
    return fetch(`${this._baseUrl}/${articleId}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._checkServerResponse);
  }
}

const articlesApi = new ArticlesApi({
  baseUrl: 'http://localhost:8080/api/articles',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default articlesApi;
