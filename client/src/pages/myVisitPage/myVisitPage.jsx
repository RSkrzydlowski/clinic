import React, {useState, useEffect, useContext} from 'react';
import './myVisitPage.scss'
import { APP_URL, VISIT_HOURS} from '../../data/constant'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../authentication';


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
      <p key={data._id}>{data.name}</p>
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
      <Link to="/visit">
      		Umów wizytę
    	</Link>
      <p>Moje wizyty:</p>
      {visitList && visitComponent}
    </div>
   );
}

export default MyVisitPage;
