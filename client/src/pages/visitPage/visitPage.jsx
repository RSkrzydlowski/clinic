import React, {useState, useEffect} from 'react';
import './'
import { APP_URL, VISIT_HOURS} from '../../data/constant'
import { DoctorVisitElement } from '../../components'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const VisitPage = () => {
  const [visitHour, setVisitHour] = useState('');
  const [doctorList, setDoctorList] = useState([]);
  const [date, setDate] = useState(new Date());
  const [dateInMilliseconds, setDateInMilliseconds] = useState(new Date(new Date().setHours(0, 0, 0, 0)).getTime());

  useEffect(() => {
    const fetchAvailableDoctor = async() => {
      const url = `${APP_URL}/api/visits/available-visit/${dateInMilliseconds}`

			await fetch(url).then(async res => {
			res.json().then(res => {
        const data = res.data.slice()
        console.log(data)
				setDoctorList(data)
			});
		});
	}
  fetchAvailableDoctor();
  }, [dateInMilliseconds]);

  const doctorItems = doctorList.map((data) => (
    <DoctorVisitElement key={data._id} name={data.name} hours={data.visit}/>
  ))

  const items = VISIT_HOURS.map((data) =>
  (
  <option
    key={data}
    value={data}
  >{data}</option>
  ))

  return (
    <div>
      <p>Wybierz termin</p>
      <Calendar
        onChange={(e) => {
          const newDate = new Date(e);
          setDateInMilliseconds(newDate.getTime())
          setDate(newDate)
        }}
        value={date}
      />
        <select onChange={(e) => setVisitHour(e.target.value)} value={visitHour}>
          {items}
        </select>
      <p>Dostępni lekarze:</p>

      {doctorList && doctorItems}

    </div>
   );
}

export default VisitPage;
