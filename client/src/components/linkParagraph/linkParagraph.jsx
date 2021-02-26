import React from 'react';
import './linkParagraph.scss'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';

const LinkParagraph = (props) => {
  return <Link className="link_paragraph" to={props.link}>
    {props.text}
  </Link>
}

export default LinkParagraph;
