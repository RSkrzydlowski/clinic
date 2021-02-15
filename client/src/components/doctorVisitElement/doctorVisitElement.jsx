import React from 'react';
import './doctorVisitElement.scss';

const DoctorVisitElement = (props) => {
  return (
    <div className="doctor_element_block">
      <p className="doctor_name_paragraph">{props.name}</p>
      <p>Ocena: {props.rate}</p>
      <p></p>
    </div>
   );
}

export default DoctorVisitElement;
