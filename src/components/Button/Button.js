import React from 'react';
import './Button.css';

function Button({
  lightTheme,
  children,
  disabled,
  type = 'button',
  additionalClasses = '',
}) {
  return (
    <button
      disabled={disabled}
      className={`button ${
        lightTheme && 'button_theme_light'
      } ${additionalClasses}`}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
