class NewsApi {
  constructor({ url }) {
    this.url = url;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Err: ${res.status}`);
  }

  getArticles(query) {
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 7);

    return fetch(
      `${
        this.url
      }&pageSize=100&q=${query}&to=${currentDate.toISOString()}&from=${pastDate.toISOString()}`,
    ).then(this._checkServerResponse);
  }
}

const newsApi = new NewsApi({
  url: `https://newsapi.org/v2/everything?language=en&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`,
});

export default newsApi;
