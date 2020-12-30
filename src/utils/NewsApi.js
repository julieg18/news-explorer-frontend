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
  baseUrl: `https://newsapi.org/v2/everything?language=en&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`,
});

export default newsApi;
