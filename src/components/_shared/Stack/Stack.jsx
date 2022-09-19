import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Stack.css';

const Stack = ({ children, className = '', spacing = 'md' }) => (
  <div className={classNames('stack', spacing, className)}>
    {children}
  </div>
);

Stack.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Stack;