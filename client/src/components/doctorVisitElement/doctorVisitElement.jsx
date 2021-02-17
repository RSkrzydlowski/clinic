import React from 'react';
import './doctorVisitElement.scss';

const DoctorVisitElement = (props) => {

  const items = props.hours.map((data) =>
  (
  <option
    key={data}
    value={data}
  >{data}</option>
  ))
  return (
    <div className="doctor_visit_element_block">
      <p className="doctor_name_paragraph">{props.name}</p>
      <p>Ocena: {props.rate}</p>
      <select>
        {items}
      </select>
    </div>
   );
}

export default DoctorVisitElement;
