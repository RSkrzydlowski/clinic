import React, {useState, useEffect} from 'react';
import './doctorPage.scss';
import { APP_URL } from '../../data/constant';

const DoctorPage = ({match}) => {
  const id = match.params.id
  const [doctor, setDoctor] = useState({})
  const [visitHour, setVisitHour] = useState('');
  const [doctorList, setDoctorList] = useState([]);
  
  useEffect(() => {
    const fetchDoctor = async() => {
      const url = `${APP_URL}/api/users/${id}`

			await fetch(url).then(async res => {
			res.json().then(res => {
        const data = res.data
        console.log(data)
				setDoctor(data)
			});
		});
	}
  fetchDoctor();
  }, []);

  return (
    <div>
      {doctor ? doctor.name : null}
      <p>Ocena</p>

      <p>Komentarze</p>
    </div>
   );
}

export default DoctorPage;
