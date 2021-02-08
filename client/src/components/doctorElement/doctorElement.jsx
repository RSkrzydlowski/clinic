import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';

const DoctorElement = (props) => {
  return (
    <div>
      <p>{props.name}</p>
      <Link className="link_paragraph" to={`/doctor/${props._id}`}>
      <p>Zobacz</p>
    </Link>
    </div>
   );
}

export default DoctorElement;
