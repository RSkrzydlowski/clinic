import React, {useState, useEffect, useContext} from 'react';
import './doctorPage.scss';
import { APP_URL } from '../../data/constant';
import { AddCommentSection, CommentElement, LoadingComponent } from '../../components';
import { AuthContext } from '../../authentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import timeService from '../../services/time'

const DoctorPage = ({match}) => {
  const id = match.params.id
  const [isLoaded, setIsLoaded] = useState(false)
  const { currentUser } = useContext(AuthContext);
  const [doctor, setDoctor] = useState({})
  const [counter, setCounter] = useState(0)
  const [doctorComments, setDoctorComments] = useState([]);
  const [stars, setStars] = useState([]);
  const [rate, setRate] = useState(0);


  useEffect(() => {
    const fetchDoctor = async() => {
      const url = `${APP_URL}/api/users/${id}`

			await fetch(url).then(async res => {
			res.json().then(res => {
        const data = res.data
				setDoctor(data)
        setIsLoaded(true)
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
      const stars = res.data.filter(data => data.rate > 0)
      let sum = 0;
      const starsArray = [0, 0, 0, 0, 0]
      for (let i = 0; i < stars.length; i++) {
        starsArray[stars[i].rate - 1] += 1;
        sum += stars[i].rate
      }
      setRate(sum / stars.length)
      if(stars.length > 0) {
        for(let i = 0; i < starsArray.length; i++) {
          starsArray[i] = (starsArray[i] / stars.length) * 100
        }
      }
      setStars(starsArray)
      setDoctorComments(data)
    });
  });
}

  fetchDoctorComments();
  }, [counter]);

  const changeCounter = () => {
    setCounter(counter + 1)
  }



  const comments = doctorComments.filter(data => data.comment !== "")

  console.table(comments)
  const commentSection = comments.map((data) =>
    <CommentElement key={data._id} rate={data.rate} date={data.date} user={data.patient} comment={data.comment}/>
  )


  return isLoaded ? (
    <div className="doctor_block">
      <div className="doctor_information_block">
        <div>
          photo
        </div>
        <div>
          {doctor ? doctor.name : null}
          <p>Ocena: {Math.round((rate + Number.EPSILON) * 100) / 100}</p>
        </div>
        <div>
          <p>oceny:</p>
          <div className="rating_statics_block">
            <div className="element">5 <FontAwesomeIcon className="golden_star" icon={faStar} /> <div className="bar" style={{width: stars[4]}}></div></div>
            <div className="element">4 <FontAwesomeIcon className="golden_star" icon={faStar} /> <div className="bar" style={{width: stars[3]}}></div></div>
            <div className="element">3 <FontAwesomeIcon className="golden_star" icon={faStar} /> <div className="bar" style={{width: stars[2]}}></div></div>
            <div className="element">2 <FontAwesomeIcon className="golden_star" icon={faStar} /> <div className="bar" style={{width: stars[1]}}></div></div>
            <div className="element">1 <FontAwesomeIcon className="golden_star" icon={faStar} /> <div className="bar" style={{width: stars[0]}}></div></div>
          </div>
        </div>
      </div>
      <Link to={`/visit/${id}`}>
      		Umów wizytę
    	</Link>
      <p className="comment_information">Komentarze ({comments.length})</p>
      <AddCommentSection changeCounter={changeCounter} doctorId={id} patientId={currentUser.id}/>
      {doctorComments && <div className="comment_section_block">{commentSection}</div>}
    </div>
   ) : <LoadingComponent isLoaded={isLoaded}/>;
}

export default DoctorPage;

