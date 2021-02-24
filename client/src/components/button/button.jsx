import React from 'react';
import './button.scss';

const Button = (props) => {
  return <button style="button" onClick={props.onClick}>{props.text}</button>;
}

export default Button;
