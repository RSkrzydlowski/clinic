import React, {useState, useEffect} from 'react';
import './doctorListPage.scss';
import { APP_URL } from '../../data/constant';

const DoctorListPage = ({match}) => {
  const [doctor, setDoctor] = useState({})
  useEffect(() => {
    const fetchDoctor = async() => {
      const url = `${APP_URL}/api/users/`

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
      doctor list
    </div>
   );
}

export default DoctorListPage;
