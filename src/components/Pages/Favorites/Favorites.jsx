import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import PageTitle from '../../_shared/PageTitle/PageTitle';
import Grid from '../../_shared/Grid/Grid';
import { fetchNowPlaying, fetchFavorites, selectMoviesNowPlaying, selectMovieFavorites } from "../../../store/movieSlice";
import MovieListItem from '../../_shared/MovieListItem/MovieListItem';

const Favorites = () => {
  const dispatch = useDispatch();
  const { results } = useSelector(selectMoviesNowPlaying());
  const { results: favorites} = useSelector(selectMovieFavorites());

  useEffect(() => {
    dispatch(fetchNowPlaying());
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <React.Fragment>
      <PageTitle>Favorites</PageTitle>
      {
        !Object.keys(favorites).length && <p>No movies have been favorited yet.</p>
      }
      {
        <Grid>
          {
            Object.entries(favorites).map(([id, count]) => {
              const movie = results.find(m => m.id === Number(id));

              if (!movie?.id) {
                return null;
              }

              return (
                <MovieListItem key={movie.id} {...movie} />
              );
            })
          }
        </Grid>
      }
    </React.Fragment>
  );
};

export default Favorites;