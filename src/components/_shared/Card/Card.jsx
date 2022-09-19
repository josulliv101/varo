import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Card.css';

const Card = ({ children, className, onClick, isFlipped, ...props }) => (
  <button className={classNames('scene', 'scene--card', className)} onClick={onClick} {...props}>
    <div className={`card ${isFlipped ? "is-flipped" : ""}`}>
      {children}
    </div>
  </button>
);

Card.propTypes = {
  children: PropTypes.node,
};

export const CardFront = ({ children }) => (
  <div className="card__face card__face--front">
    {children}
  </div>
);

CardFront.propTypes = {
  children: PropTypes.node,
};

export const CardBack = ({ children }) => (
  <div className="card__face card__face--back">
    {children}
  </div>
);

CardBack.propTypes = {
  children: PropTypes.node,
};

export default Card;