import React from 'react';
import './visitElement.scss'

const VisitElement = (props) => {
  return (
    <div className="visit_element_block">
      <p className="visit_name_paragraph">{props.name}</p>
      <p>Data: {props.date}</p>
      <p></p>
      <p>Godzina: {props.hour}</p>
    </div>
   );
}

export default VisitElement;
