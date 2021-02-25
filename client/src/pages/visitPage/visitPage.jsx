import React, {useState, useEffect, useContext} from 'react';
import './visitPage.scss'
import { APP_URL, VISIT_HOURS} from '../../data/constant'
import { DoctorVisitElement, Button, LoadingComponent } from '../../components'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AuthContext } from '../../authentication';


const VisitPage = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [doctorList, setDoctorList] = useState([]);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [dateInMilliseconds, setDateInMilliseconds] = useState(new Date(new Date().setHours(0, 0, 0, 0)).getTime());
  const [visitData, setVisitData] = useState(null)
  const [counter, setCounter] = useState(0)
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchAvailableDoctor = async() => {
      const url = `${APP_URL}/api/visits/available-visit/${dateInMilliseconds}`
			await fetch(url).then(async res => {
			res.json().then(res => {
        if(res.success) {
          const data = res.data.slice()
          setIsLoaded(true)
          setDoctorList(data)
        } else {
          alert(res.error)
        }
			});
		});
	}
  fetchAvailableDoctor();
  }, [dateInMilliseconds, counter]);

  const changeData = (data) => {
    setVisitData(data)
  }

  const doctorItems = doctorList.map((data) => (
    <DoctorVisitElement key={data._id} doctorId={data._id} name={data.name} hours={data.visit} initialValue={data.visit[0]} changeData={changeData}/>
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
        setVisitData(null)
        setDateInMilliseconds(new Date(new Date().setHours(0, 0, 0, 0)).getTime())
        setCounter(counter + 1)
        if (!success) {
          alert(error);
        }
      })
    }

  };

  return isLoaded ? (
    <div className="visit_page_block">
      <div className={visitData ? "visit_time_two_columns_block" : "visit_time_one_columns_block"}>
        <div>
          <p>Wybierz termin</p>
          <Calendar
            onChange={(e) => {
              const newDate = new Date(e);
              if (newDate.getTime() >= new Date(new Date().setHours(0, 0, 0, 0)).getTime() && (newDate.getDay() !== 0 && newDate.getDay() !== 6)) {
              setDateInMilliseconds(newDate.getTime())
              setCalendarDate(newDate)
              }
            }}
            value={calendarDate}
          />
        </div>
        {visitData && (
        <div>
          <p>Szczegóły:</p>
          <p>{visitData.doctorName}</p>
          {visitData.visitHour && <p>{`${calendarDate.getDate()}-${calendarDate.getMonth() + 1}-${calendarDate.getFullYear()}`}</p>}
          {visitData.visitHour && <p>{visitData.visitHour.split(" - ")[0]}</p>}
          <Button text="Akceptuj" onClick={addVisit} />
        </div>
        )}

      </div>


      <p className="available_doctors_paragraph">Dostępni lekarze:</p>

      {doctorList && doctorItems}

    </div>
   ) : <LoadingComponent isLoaded={isLoaded}/>;;
}

export default VisitPage;
