import React, {useState, useContext} from 'react';
import './header.scss';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../authentication';
import authService from "../../services/auth";

const Header = () => {
	const { currentUser } = useContext(AuthContext);
	return (
		<div className="main_div">
			<p>Clinic</p>
			{!currentUser && (<div>
    		<Link to="/sign-in">
      		zaloguj się
    		</Link>
				<Link to="/sign-up">
      		zarejestruj się
    		</Link>
  		</div>)}
			{currentUser && (<div>
    		<Link to="/sign-out">
      		wyloguj się
    		</Link>
  		</div>)}
		</div>
	)

};

export default Header;
