import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MovieCast from '../MovieCast/MovieCast';
import './MovieExtendedDetails.css';

const MovieExtendedDetails = ({ className, descr, isLoaded, casting = [] }) => (
  <div className={classNames('movie-extended-details', className)}>
    { descr && <p className="movie-extended-details--descr">{descr}</p> }
    { <MovieCast casting={casting} isLoaded={isLoaded} /> }
  </div>
);

MovieExtendedDetails.propTypes = {
  className: PropTypes.string,
  descr: PropTypes.string,
  casting: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    imgPath: PropTypes.string,
  })),
};

export default MovieExtendedDetails;