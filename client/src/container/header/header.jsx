import React, {useState, useEffect, useContext} from 'react';
import './header.scss';
import { AuthContext } from '../../authentication';
import authService from "../../services/auth";
import {LinkHeaderButton} from '../../components'

const Header = () => {
	const { currentUser } = useContext(AuthContext);
	const [headerClassName, setHeaderClassName] = useState('');

	useEffect(() => {
    const setClassName = () => {
      if(currentUser) {
				setHeaderClassName("header_logged")
			} else {
				setHeaderClassName("header_not_logged")
			}
		}

  setClassName();
  }, [currentUser]);

	return (
		<div>

			{/* {!currentUser && (<div className="header_logged"> */}
			{!currentUser && (<div className="header_not_logged">
				<p className="app_name_paragraph">Clinic</p>
    		<LinkHeaderButton link="/sign-in" text="zaloguj się" />
    		<LinkHeaderButton link="/sign-up" text="zarejestruj się" />
  		</div>)}
			{/* {currentUser && (<div className="header_not_logged"> */}
			{currentUser && (<div className="header_logged">
				<p className="app_name_paragraph">Clinic</p>
				<LinkHeaderButton link="/home"  onClick={() => authService.signOut()} text="Wyloguj się" />
  		</div>)}
		</div>
	)

};

export default Header;
