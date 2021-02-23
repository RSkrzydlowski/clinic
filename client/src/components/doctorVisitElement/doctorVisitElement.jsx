import React, {useState} from 'react';
import './doctorVisitElement.scss';
import {VISIT_HOURS} from '../../data/constant'

const DoctorVisitElement = (props) => {
  const hours = props.hours;
  const doctorName = props.name;
  const doctorId = props.doctorId;
  const [hourValue, setHourValue] = useState(hours[0])
  console.log('hours', hours)
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
