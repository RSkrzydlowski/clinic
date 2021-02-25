import React from 'react';
import './doctorElement.scss';
import LinkButton from '../linkButton';

const DoctorElement = (props) => {
  const rate = props.rate !== 'brak oceny' ? Math.round((props.rate + Number.EPSILON) * 100) / 100 : 'brak oceny'
  return (
    <div className="doctor_element_block">
      <p className="doctor_name_paragraph">{props.name}</p>
      <p></p>
      <p>Ocena: {rate}</p>
      <LinkButton link={`/doctor/${props._id}`} text="Zobacz"/>
    </div>
   );
}

export default DoctorElement;
