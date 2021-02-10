import React, {useState, useEffect, useContext} from 'react';
import './doctorPage.scss';
import { APP_URL } from '../../data/constant';
import { AddCommentSection, CommentElement } from '../../components';
import { AuthContext } from '../../authentication';

const DoctorPage = ({match}) => {
  const id = match.params.id
  const { currentUser } = useContext(AuthContext);
  const [doctor, setDoctor] = useState({})
  const [counter, setCounter] = useState(0)
  const [doctorComments, setDoctorComments] = useState([]);
  const [visitHour, setVisitHour] = useState('');


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

  useEffect(() => {
  const fetchDoctorComments = async() => {
    const url = `${APP_URL}/api/comments/${id}`

    await fetch(url).then(async res => {
    res.json().then(res => {
      const data = res.data
      setDoctorComments(data)
    });
  });
}

  fetchDoctorComments();
  }, [counter]);

  const changeCounter = () => {
    setCounter(counter + 1)
  }

  const commentSection = doctorComments.map((data) =>
    <CommentElement key={data._id} date={data.date} user={data.patient} comment={data.comment}/>
  )

  return (
    <div>
      <div className="doctor_block">
        <div>
          photo
        </div>
        <div>
          {doctor ? doctor.name : null}
          <p>Ocena</p>

          <p>Komentarze</p>

          <p>Twoje wizyty:</p>
        </div>
      </div>
     <AddCommentSection changeCounter={changeCounter} doctorId={id} patientId={currentUser.id}/>
     {doctorComments && commentSection}
    </div>
   );
}

export default DoctorPage;
