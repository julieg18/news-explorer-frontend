import Api from './Api';

class NewsApi extends Api {
  getArticles(query) {
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 7);

    return fetch(
      `${
        this._baseUrl
      }&pageSize=100&q=${query}&to=${currentDate.toISOString()}&from=${pastDate.toISOString()}`,
    ).then(this._checkServerResponse);
  }
}

const newsApi = new NewsApi({
  baseUrl:
    'https://nomoreparties.co/news/v2/everything?language=en&apiKey=7a87f53207154e3698b4738295e2f3a0',
});

export default newsApi;
