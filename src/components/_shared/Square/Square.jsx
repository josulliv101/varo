import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Square.css';

const Square = ({ bgImage, children, className, size }) => (
  <div className={classNames('square', size, className)}>
    <div style={{ backgroundImage: `url(${bgImage})` }}>
      {children}
    </div>
  </div>
);

Square.propTypes = {
  bgImage: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.string,
};

export default Square;