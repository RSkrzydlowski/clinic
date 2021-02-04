import React, {useState, useEffect} from 'react';
import './myVisitPage.scss'
import { APP_URL, VISIT_HOURS} from '../../data/constant'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';


const MyVisitPage = () => {
  const [visitHour, setVisitHour] = useState('');
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    const getData = async() => {
      const url = `${APP_URL}/api/users/doctors`

			await fetch(url).then(async res => {
			res.json().then(res => {
        const data = res.data.slice()
				setDoctorList(data)
			});
		});
	}
		getData();
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
      {doctorList &&
      (<select onChange={(e) => setVisitHour(e.target.value)} value={visitHour}>
        {doctorItems}
      </select>)
      }
      {doctorList && doctorParagraph}

      <select onChange={(e) => setVisitHour(e.target.value)} value={visitHour}>
        {items}
      </select>
    </div>
   );
}

export default MyVisitPage;
