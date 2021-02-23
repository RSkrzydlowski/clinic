import React, {useState, useEffect} from 'react';
import './doctorListPage.scss';
import { APP_URL } from '../../data/constant';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import { DoctorElement } from '../../components'

const DoctorListPage = ({match}) => {
  const [doctorList, setDoctorList] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchDoctor = async() => {
      const url = `${APP_URL}/api/users/doctors`

			await fetch(url).then(async res => {
			res.json().then(res => {
        const data = res.data
        setIsLoaded(true)
				setDoctorList(data)
			});
		});
	}
  fetchDoctor();
  }, []);

  const doctorParagraph = doctorList.map((data) =>
    <DoctorElement key={data._id} _id={data._id} name={data.name} rate={data.rate}/>
  )


  return isLoaded ? (
    <div>
      <p>Lekarze pracujący w naszej przychodni:</p>
      {doctorList && doctorParagraph}
    </div>
   ) : null
}

export default DoctorListPage;
