import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import MovieExtendedDetails from '../MovieExtendedDetails/MovieExtendedDetails';
import MovieHeader from '../MovieHeader/MovieHeader';
import Square from '../Square/Square';
import HStack from '../HStack/HStack';
import Button from '../Button/Button';
import { fetchCredits, selectMovieCast } from "../../../store/movieSlice";
import './MovieListItem.css';

const MovieListItem = ({ className, onClick, id, isActive, title, rating, genres, poster, overview }) => {
  const dispatch = useDispatch();
  const castDetails = useSelector(selectMovieCast(id));

  useEffect(() => {
    if (isActive) {
      dispatch(fetchCredits(id))
    }
  }, [dispatch, isActive, id]);

  const handleClick = onClick ? () => onClick(!isActive ? id : null) : undefined;

  return (
    <Button className={classNames('movie-list-item', {"movie-list-item--inactive": !handleClick }, className)} onClick={handleClick}>
      <HStack>
        <Square size={isActive ? "md" : "sm"} bgImage={poster} />
        <MovieHeader spacing="xs" title={title} rating={rating} genres={isActive ? genres : []} />
      </HStack>
      { isActive && <MovieExtendedDetails descr={overview} isLoaded={!castDetails?.castLoading} casting={castDetails?.castResults} />}
    </Button>
  );
}

MovieListItem.propTypes = {
  className: PropTypes.string,
  id: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  genres: PropTypes.arrayOf(PropTypes.string),
};

export default MovieListItem;