import React from 'react';
import './linkHeaderButton.scss';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';

const LinkHeaderButton = (props) => {
  return <Link className="link_header_button" to={props.link}><button className="header_button" onClick={props.onClick}>{props.text}</button></Link>
}

export default LinkHeaderButton;
