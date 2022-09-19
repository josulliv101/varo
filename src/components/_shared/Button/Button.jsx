import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Button.css';

const Button = ({ children, className, ...props }) => (
  <button className={classNames('button', className)} {...props}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Button;