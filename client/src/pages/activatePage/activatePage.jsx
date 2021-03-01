import React, {useState, useEffect} from 'react';
import './activatePage.scss';
import { APP_URL } from '../../data/constant';
import { LoadingComponent } from '../../components';

const ActivatePage = ({match}) => {
  const id = match.params.id
  const [isLoaded, setIsLoaded] = useState(false)
  const [text, setText] = useState("")

  useEffect(() => {
    const setActivate = async() => {
      const url = `${APP_URL}/api/users/activate/${id}`
			await fetch(url).then(async res => {
			res.json().then(res => {
        const message = res.message
        setIsLoaded(true)
				setText(message)
			});
		});
	}

  setActivate();
  }, []);

  return isLoaded ? (
    <div className="activate_page">
      {text}
    </div>
   ) : <LoadingComponent isLoaded={isLoaded}/>;;
}

export default ActivatePage;
