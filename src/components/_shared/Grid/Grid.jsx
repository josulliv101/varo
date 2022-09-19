import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Grid.css';

const Grid = ({ children, className }) => (
  <div className={classNames('grid', className)}>
    {children}
  </div>
);

Grid.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Grid;