import React, {useState, useEffect} from 'react';
import './activatePage.scss';
import { APP_URL } from '../../data/constant';

const ActivatePage = ({match}) => {
  const id = match.params.id
  const [text, setText] = useState("")

  useEffect(() => {
    const setActivate = async() => {
      const url = `${APP_URL}/api/users/activate/${id}`
			await fetch(url).then(async res => {
			res.json().then(res => {
        const message = res.message
				setText(message)
			});
		});
	}

  setActivate();
  }, []);

  return (
    <div>
      {text}
    </div>
   );
}

export default ActivatePage;
