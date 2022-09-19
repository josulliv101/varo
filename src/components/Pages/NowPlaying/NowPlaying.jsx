import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTitle from '../../_shared/PageTitle/PageTitle';
import Stack from '../../_shared/Stack/Stack';
import Grid from '../../_shared/Grid/Grid';
import useScreenSize from '../../hooks/useScreenSize';
import { fetchNowPlaying, fetchFavorites, incrementFavorite, selectMoviesNowPlaying } from "../../../store/movieSlice";
import MovieListItem from '../../_shared/MovieListItem/MovieListItem';
import MovieCard from '../../_shared/MovieCard/MovieCard';

const NowPlaying = () => {
  const dispatch = useDispatch();
  const { results, error, loading} = useSelector(selectMoviesNowPlaying());
  const { isMobile } = useScreenSize();
  const [activeMovieId, setActiveMovieId] = useState(null);
  let handleFavorite;

  useEffect(() => {
    dispatch(fetchNowPlaying());
    dispatch(fetchFavorites());
  }, [dispatch]);

  if (error) {
    return <PageTitle>Error</PageTitle>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  const MovieComponent = isMobile ? MovieListItem : MovieCard;
  const ContainerComponent = isMobile ? Stack : Grid;
  const className = isMobile ? "movie-list-item--mobile-view" : "movie-card--desktop-view";

  if (!isMobile) {
    handleFavorite = (id) => {
      dispatch(incrementFavorite(id));
    };
  }

  return (
    <React.Fragment>
      <PageTitle>Now Playing</PageTitle>
      <ContainerComponent>
        { results.map(movie => {
          return (
            <MovieComponent
              key={movie.id}
              className={className}
              isActive={activeMovieId === movie.id}
              onClick={setActiveMovieId}
              onFavorite={handleFavorite}
              {...movie}
            />
          );
        })}
      </ContainerComponent>
    </React.Fragment>
  );
};

export default NowPlaying;
