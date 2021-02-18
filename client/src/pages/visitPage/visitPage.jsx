import React, {useState, useEffect, useContext} from 'react';
import './'
import { APP_URL, VISIT_HOURS} from '../../data/constant'
import { DoctorVisitElement } from '../../components'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AuthContext } from '../../authentication';


const VisitPage = () => {
  const [visitHour, setVisitHour] = useState('');
  const [doctorList, setDoctorList] = useState([]);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [dateInMilliseconds, setDateInMilliseconds] = useState(new Date(new Date().setHours(0, 0, 0, 0)).getTime());
  const [visitData, setVisitData] = useState({})
  const [counter, setCounter] = useState(0)
  const { currentUser } = useContext(AuthContext);

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
  }, [dateInMilliseconds, counter]);

  const changeData = (data) => {
    setVisitData(data)
  }

  const doctorItems = doctorList.map((data) => (
    <DoctorVisitElement key={data._id} doctorId={data._id} name={data.name} hours={data.visit} changeData={changeData}/>
  ))

  const items = VISIT_HOURS.map((data) =>
  (
  <option
    key={data}
    value={data}
  >{data}</option>
  ))

  const addVisit = () => {
    const url = `${APP_URL}/api/visits/add`
    const {visitHour, doctorId} = visitData;
    const visitHourArray = visitHour.split(" - ")
    if(visitHour && doctorId) {
      const dateString = `${calendarDate.getMonth() + 1} ${calendarDate.getDate()}, ${calendarDate.getFullYear()} ${visitHourArray[0]}:00`;
      const date = new Date(dateString).getTime();
      fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          doctorId,
          patientId: currentUser.id
        })
      }).then(async res => {
        const { success, error } = await res.json();
        setCounter(counter + 1)
        if (!success) {
          alert(error);
        }
      })
    }

  };

  return (
    <div>
      <p>Wybierz termin</p>
      <Calendar
        onChange={(e) => {
          const newDate = new Date(e);
          setDateInMilliseconds(newDate.getTime())
          setCalendarDate(newDate)
        }}
        value={calendarDate}
      />
      <p>{visitData.doctorName}</p>
      <p>{visitData.visitHour}</p>
      <button onClick={addVisit}>Akceptuj</button>
      <p>Dostępni lekarze:</p>

      {doctorList && doctorItems}

    </div>
   );
}

export default VisitPage;
