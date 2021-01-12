import React, { useContext } from "react";
import './topScreen.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AuthContext } from "../../authentication";

import LoginPage from '../../pages/loginPage';
import RegisterPage from '../../pages/registerPage';

const TopScreen = () => {
	// const cu = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
	// const { currentUser } = useContext(AuthContext);
	return (
		<div className="top_screen">
			<div className="menubar_display">
			</div>
			<div className="top_display">
				<Route path="/sign-up" component={RegisterPage} />
				<Route path="/sign-in" component={LoginPage} />
			</div>
		</div>
	);
};

export default TopScreen;
