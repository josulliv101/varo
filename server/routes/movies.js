import express from 'express';
import { getNowPlayingMovies, getGenreList, getCredits, getPosterPathRoot } from '../services/imdb';

let router = express.Router();

const inMemoryMockDB = {};

function transformMovieResults(results = [], genreDefinitions = {}) {
  const genresById = genreDefinitions.reduce((acc, g) => ({ ...acc, [g.id]: g.name }), {});
  return results.map(({ id, genre_ids = [], poster_path, overview, title, vote_average }) => ({
    id,
    title,
    overview,
    rating: vote_average,
    genres: genre_ids.map(id => genresById[id]),
    poster: `${getPosterPathRoot()}${poster_path}`,
  }));
}

router.get('/nowPlaying', async (req, res) => {
  let nowPlaying;
  await Promise.all([getNowPlayingMovies(), getGenreList()])
    .then(([{ results, ...nowPlayingWithoutResults }, { genres }]) => {
      nowPlaying = {
        ...nowPlayingWithoutResults,
        results: transformMovieResults(results, genres)
      };
    })
    .catch((error) => {
      console.log(error);
      nowPlaying = error;
    });
  return res.json(nowPlaying);
});

router.get('/credits', async (req, res) => {
  const { id } = req.query;
  let credits;
  await Promise.all([getCredits(id)])
    .then(([results]) => {
      credits = {
        ...results,
        cast: results.cast.map(({ name, profile_path }) => ({ name, profile_path: profile_path ? `${getPosterPathRoot()}${profile_path}` : '' }))
      };
    })
    .catch((error) => {
      console.log(error);
      credits = error;
    });
  return res.json(credits);
});

router.get('/favorite', async (req, res) => {
  const { id } = req.query;
  if (id) {
    inMemoryMockDB[id] = inMemoryMockDB[id] ? inMemoryMockDB[id] + 1 : 1;
  }
  return res.json(inMemoryMockDB);
});

router.get('/favorites', async (req, res) => {
  return res.json(inMemoryMockDB);
});

export default router;
