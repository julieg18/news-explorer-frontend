import Api from './Api';
import {
  newsApiAuthorizationKey,
  newsApiBaseUrl,
  newsSearchDays,
} from './config';

class NewsApi extends Api {
  getArticles(query) {
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - newsSearchDays);

    return fetch(
      `${
        this._baseUrl
      }&pageSize=100&q=${query}&to=${currentDate.toISOString()}&from=${pastDate.toISOString()}`,
    ).then(this._checkServerResponse);
  }
}

const newsApi = new NewsApi({
  baseUrl: `${newsApiBaseUrl}&apiKey=${newsApiAuthorizationKey}`,
});

export default newsApi;
