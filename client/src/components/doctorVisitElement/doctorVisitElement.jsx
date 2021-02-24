import React, {useState} from 'react';
import './doctorVisitElement.scss';
import {VISIT_HOURS} from '../../data/constant'

const DoctorVisitElement = (props) => {
  const hours = props.hours;
  const doctorName = props.name;
  const doctorId = props.doctorId;
  const initialValue = props.initialValue;
  const [hourValue, setHourValue] = useState(initialValue)

  const items = hours.map((data) =>
  (
  <option
    key={data}
    value={data}
  >{data}</option>
  ))

  const changeVisitData = () => {
    const data = {
      visitHour: hourValue,
      doctorName,
      doctorId
    }
    props.changeData(data)
  }




  return hours.length > 0 ? (
    <div className="doctor_visit_element_block">
      <p className="doctor_name_paragraph">{doctorName}</p>
      <select onChange={(e) => setHourValue(e.target.value)} value={hourValue}>
        {items}
      </select>

      <button onClick={changeVisitData}>Wybierz</button>
    </div>
   ) : null;
}

export default DoctorVisitElement;
