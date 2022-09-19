import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchNowPlaying = createAsyncThunk(
  'movies/fetch_now_playing',
  async (_, { getState }) => {
    const { results } = getState().movie.nowPlaying;
    if (results.length) {
      return getState().movie.nowPlaying.results
    }
    const response = await fetch('/movies/nowPlaying').then((res) =>
      res.json(),
    );
    return response.results;
  },
);

export const fetchFavorites = createAsyncThunk(
  'movies/fetch_favorites',
  async () => {
    const response = await fetch('/movies/favorites').then((res) =>
      res.json(),
    );
    return response;
  },
);

export const fetchCredits = createAsyncThunk(
  'movies/fetch_credits',
  async (id) => {
    const response = await fetch(`/movies/credits?id=${id}`).then((res) =>
      res.json(),
    );
    return response;
  },
);

export const incrementFavorite = createAsyncThunk(
  'movies/increment_favorite',
  async (id) => {
    const response = await fetch(`/movies/favorite?id=${id}`).then((res) =>
      res.json(),
    );
    return response;
  },
);

export const movieSlice = createSlice({
  name: "movie",

  initialState: {
    nowPlaying: {
      loading: false,
      results: [],
      error: ""
    },
    favorites: {
      loading: false,
      results: {},
      error: ""
    },
    cast: {}
  },

  reducers: {

  },
  extraReducers: {
    [fetchNowPlaying.fulfilled]: (state, action) => {
      state.nowPlaying.results = action.payload;
      state.nowPlaying.loading = false;
    },
    [fetchNowPlaying.pending]: (state, action) => {
      state.nowPlaying.loading = true;
    },
    [fetchFavorites.fulfilled]: (state, action) => {
      state.favorites.results = action.payload;
      state.favorites.loading = false;
    },
    [fetchFavorites.pending]: (state, action) => {
      state.favorites.loading = true;
    },
    [incrementFavorite.fulfilled]: (state, action) => {
      state.favorites.results = action.payload;
      state.favorites.loading = false;
    },
    [fetchCredits.fulfilled]: (state, action) => {
      const { id, cast } = action.payload;
      state.cast[id] = {
        castLoading: false,
        castResults: cast,
        castError: ""
      }
    },
    [fetchCredits.pending]: (state, action) => {
      const { arg: id } = action.meta;
      state.cast[id] = {
        castLoading: true,
        castResults: [],
        castError: ""
      };
    },
  },
});

export const selectMoviesNowPlaying = () => (state) => state[movieSlice.name].nowPlaying;
export const selectMovieInFavorites = (id) => (state) => !!state[movieSlice.name].favorites.results[id];
export const selectMovieFavorites = () => (state) => state[movieSlice.name].favorites;
export const selectMovieCast = (id) => (state) => state[movieSlice.name].cast[id];
