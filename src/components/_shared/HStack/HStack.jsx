import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './HStack.css';

const HStack = ({ children, className = '', spacing = '' }) => (
  <div className={classNames('hstack', spacing, className)}>
    {children}
  </div>
);

HStack.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default HStack;