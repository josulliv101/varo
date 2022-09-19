import https from 'https';

export const imdbHost = 'https://api.themoviedb.org';
export const getPosterPathRoot = () => 'https://www.themoviedb.org/t/p/w1280';

const nowPlayingPath = () => '/3/movie/now_playing';
const genreListPath = () => '/3/genre/movie/list';
const creditsPath = (id) => `/3/movie/${id}/credits`;

const apiKey = '';

const getApiUrl = ({ path, queryParamString }) =>
  `${imdbHost}${path}?api_key=${apiKey}${
    queryParamString ? '&' + queryParamString : ''
  }`;

const makeRequest = (url) =>
  new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      response.setEncoding('utf-8');

      var data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        console.log(data);
        var responseObject = JSON.parse(data);
        resolve(responseObject);
      });
    });
    request.on('error', (error) => {
      reject(error);
    });
  });

export const getNowPlayingMovies = () =>
  makeRequest(getApiUrl({ path: nowPlayingPath() }));

export const getGenreList = () =>
  makeRequest(getApiUrl({ path: genreListPath() }));

export const getCredits = (id) =>
  makeRequest(getApiUrl({ path: creditsPath(id) }));

