import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Stack from '../Stack/Stack';
import './MovieHeader.css';

const MovieHeader = ({ className, title, rating = 0, genres = [], spacing = "sm" }) => (
  <Stack className={classNames('movie-header', className)} spacing={spacing}>
    <h4 className="movie-header--title">{title}</h4>
    {typeof rating === 'number' && <div className="movie-header--rating">{rating} rating</div>}
    {!!genres?.length && <div className="movie-header--genres">{genres.join(", ")}</div>}
  </Stack>
);

MovieHeader.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  genres: PropTypes.arrayOf(PropTypes.string),
};

export default MovieHeader;