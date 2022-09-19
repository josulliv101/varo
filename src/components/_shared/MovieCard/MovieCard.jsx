import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import HStack from "../HStack/HStack";
import Square from "../Square/Square";
import Card, { CardFront, CardBack } from "../Card/Card";
import MovieHeader from '../MovieHeader/MovieHeader';
import MovieExtendedDetails from '../MovieExtendedDetails/MovieExtendedDetails';
import { fetchCredits, selectMovieCast, selectMovieInFavorites } from "../../../store/movieSlice";
import heart from '../../../assets/heart.svg';
import './MovieCard.css';

const FavoriteButton = ({ className, isActive, onClick }) => {
  return (
    <div tabIndex="0" aria-pressed={isActive} title="favorite button" role="button" aria-label="favorite button" className={classNames('movie-card--fav-btn', className)} onKeyPress={onClick} onClick={onClick}>
      <img
        src={heart}
        className="Heart-icon"
        alt="favorite this movie"
        width="16"
        height="16"
      />
    </div>
  );
}

const MovieCard = ({ className, id, isActive, onClick, onFavorite, overview, poster, rating, title, genres }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const dispatch = useDispatch();
  const castDetails = useSelector(selectMovieCast(id));
  const isInMyFavorites = useSelector(selectMovieInFavorites(id));

  const handleClick = () => {
    onClick(id);
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    if (isActive) {
      dispatch(fetchCredits(id))
    }
  }, [dispatch, isActive, id]);

  const handleFavoriteClick = (ev) => {
    ev.stopPropagation();
    onFavorite(id);

    // User selected fav btn via keyboard, don't flip card over
    if (ev.keyCode === 0) {
      ev.preventDefault();
    }
  };

  return (
    <Card className={classNames('movie-card', className)} isFlipped={isFlipped} onClick={handleClick}>
      <CardFront>
        {poster && <Square bgImage={poster} size="full" />}
        <MovieHeader title={title} rating={rating} spacing="xs" />
        { onFavorite && <FavoriteButton isActive={isInMyFavorites} onClick={handleFavoriteClick} />}
      </CardFront>
      <CardBack>
        <HStack>
          <Square size="sm" bgImage={poster} />
          <MovieHeader spacing="xs" title={title} rating={rating} genres={genres} />
        </HStack>
        <MovieExtendedDetails descr={overview} isLoaded={!castDetails?.castLoading} casting={castDetails?.castResults} />
      </CardBack>
    </Card>
  );
};

MovieCard.propTypes = {
  className: PropTypes.string,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  genres: PropTypes.arrayOf(PropTypes.string),
};

export default MovieCard;