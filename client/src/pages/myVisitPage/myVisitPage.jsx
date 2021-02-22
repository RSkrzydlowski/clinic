import React, {useState, useEffect, useContext} from 'react';
import './myVisitPage.scss'
import { APP_URL, VISIT_HOURS} from '../../data/constant'
import { LinkButton, VisitElement } from '../../components'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../authentication';
import timeService from '../../services/time'


const MyVisitPage = () => {
  const [visitHour, setVisitHour] = useState('');
  const [doctorList, setDoctorList] = useState([]);
  const [visitList, setVisitList] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchDoctorData = async() => {
      const url = `${APP_URL}/api/users/doctors`

			await fetch(url).then(async res => {
			res.json().then(res => {
        const data = res.data.slice()
				setDoctorList(data)
			});
		});


	}

  const fetchUserVisits = async() => {
    const url = `${APP_URL}/api/visits/${currentUser.id}`

    await fetch(url).then(async res => {
    res.json().then(res => {
      const data = res.data.slice()
      console.log('data', data)
      setVisitList(data)
    });
  });
  }
  fetchDoctorData();
  fetchUserVisits();
  }, []);

  const doctorItems = doctorList.map((data) => (
    <option
    key={data._id}
    value={data.name}
  >{data.name}</option>
  ))

  const doctorParagraph = doctorList.map((data) =>
    <Link key={data._id} to={`/doctor/${data._id}`}>
      <p>{data.name}</p>
    </Link>
  )

  const visitComponent = visitList.map((data) =>
      <VisitElement key={data._id} name={data.doctor} date={timeService.convertDate(data.date).split(' ')[0]} hour={timeService.convertDate(data.date).split(' ')[1]}/>
  )

  const items = VISIT_HOURS.map((data) =>
  (
  <option
    key={data}
    value={data}
  >{data}</option>
  ))

  return (
    <div>
      <LinkButton link="/visit" text="Umów wizytę" />
      <p>Moje wizyty:</p>
      {visitList.length === 0 ? "Nie masz umówionych wizyt" : visitComponent}
    </div>
   );
}

export default MyVisitPage;
