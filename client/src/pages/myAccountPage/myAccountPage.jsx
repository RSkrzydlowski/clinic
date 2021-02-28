import React, { useState, useEffect, useContext } from 'react';
import './myAccountPage.scss'
import { LinkButton, LoadingComponent } from '../../components';
import {APP_URL} from '../../data/constant'
import { AuthContext } from '../../authentication';

const MyAccountPage = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState({})
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchDoctor = async() => {
      const url = `${APP_URL}/api/users/${currentUser.id}`

			await fetch(url).then(async res => {
			res.json().then(res => {
        const data = res.data
        setIsLoaded(true)
				setUser(data)
			});
		});
	}
  fetchDoctor();
  }, []);

  return isLoaded ? (
    <div className="my_account_page">
      <p>Moje konto:</p>
      <p>Nick: {user.name}</p>
      <p>Email: {user.email}</p>
      <LinkButton text="Zmień hasło" link="/set-password" />
    </div>
   ) : <LoadingComponent isLoaded={isLoaded}/>;;
}

export default MyAccountPage;
