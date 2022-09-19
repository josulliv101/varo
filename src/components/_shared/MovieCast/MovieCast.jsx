import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import HStack from '../HStack/HStack';
import Square from '../Square/Square';
import './MovieCast.css';

const MovieCast = ({ className, casting = [], isLoaded }) => (
  <div className={classNames("movie-cast", { "movie-cast--loaded": isLoaded})}>
    <h4 className="movie-cast--subhead">Casting ({casting.length})</h4>
    <HStack className="movie-cast--people">
      {
        casting.map(({ name, profile_path }) => {
          return (
            <HStack key={name}>
              { profile_path && <Square size="xs" bgImage={profile_path} /> }
              <span className="movie-cast--name">{name}</span>
            </HStack>
          );
        })
      }
    </HStack>
  </div>
);

MovieCast.propTypes = {
  className: PropTypes.string,
  casting: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    imgPath: PropTypes.string,
  })),
};

export default MovieCast;