import React from 'react';
import './doctorElement.scss';
import LinkButton from '../linkButton';

const DoctorElement = (props) => {
  return (
    <div className="doctor_element_block">
      <p className="doctor_name_paragraph">{props.name}</p>
      <p></p>
      <p>Ocena: {props.rate}</p>
      <LinkButton link={`/doctor/${props._id}`}/>
    </div>
   );
}

export default DoctorElement;
