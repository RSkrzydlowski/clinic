import React, {useState, useEffect, useContext} from 'react';
import './myVisitPage.scss'
import { APP_URL, VISIT_HOURS} from '../../data/constant'
import { LinkButton, VisitElement, LoadingComponent } from '../../components'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../authentication';
import timeService from '../../services/time'


const MyVisitPage = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [visitList, setVisitList] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
  const fetchUserVisits = async() => {
    const url = `${APP_URL}/api/visits/${currentUser.id}`

    await fetch(url).then(async res => {
    res.json().then(res => {
      const data = res.data.slice()
      setIsLoaded(true)
      setVisitList(data)
    });
  });
  }

  fetchUserVisits();
  }, []);

  const visitComponent = visitList.map((data) =>
      <VisitElement key={data._id} name={data.doctor} date={timeService.convertDate(data.date).split(' ')[0]} hour={timeService.convertDate(data.date).split(' ')[1]}/>
  )

  return isLoaded ? (
    <div className="visit_page_block">
      <div className="visit_button_wrapper"><LinkButton link="/visit" text="Umów wizytę" /></div>

      <p className="visit_paragraph">Moje wizyty:</p>
      {visitList.length === 0 ? "Nie masz umówionych wizyt" : visitComponent}
    </div>
   ) : <LoadingComponent isLoaded={isLoaded}/>;;
}

export default MyVisitPage;
