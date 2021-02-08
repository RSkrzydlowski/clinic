import React, {useState, useEffect} from 'react';
import './doctorListPage.scss';
import { APP_URL } from '../../data/constant';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import DoctorElement from '../../components/doctorElement'

const DoctorListPage = ({match}) => {
  const [doctorList, setDoctorList] = useState([])
  useEffect(() => {
    const fetchDoctor = async() => {
      const url = `${APP_URL}/api/users/doctors`

			await fetch(url).then(async res => {
			res.json().then(res => {
        const data = res.data
        console.log(data)
				setDoctorList(data)
			});
		});
	}
  fetchDoctor();
  }, []);

  console.log(doctorList)

  const doctorParagraph = doctorList.map((data) =>
    <DoctorElement key={data._id} _id={data._id} name={data.name}/>
  )


  return (
    <div>
      <p>Dostępni lekarze:</p>
      {doctorList && doctorParagraph}
    </div>
   );
}

export default DoctorListPage;
