import React from 'react';
import './linkButton.scss';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';

const LinkButton = (props) => {
  return (
    <Link className="link_button" to={props.link}>
      {props.text}
    </Link>
   );
}

export default LinkButton;
