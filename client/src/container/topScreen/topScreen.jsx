import React, { useContext } from "react";
import './topScreen.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AuthContext } from "../../authentication";

import Footer from '../../container/footer';
import { LoginPage, RegisterPage, VisitPage, MyVisitPage, DoctorPage, DoctorListPage, ActivatePage, MyAccountPage, SetPasswordPage, ResetPasswordPage } from '../../pages';

const TopScreen = () => {
	const { currentUser } = useContext(AuthContext);
	return (
		// <div className="top">
		<div>
			{currentUser ? (<div className="top_display_logged">
				<Route path="/my-visit" component={MyVisitPage} />
				<Route path="/visit" component={VisitPage} />
				<Route path="/doctor/:id" component={DoctorPage} />
				<Route path="/doctor-list/" component={DoctorListPage} />
				<Route path="/activate/:id" component={ActivatePage} />
				<Route path="/my-account" component={MyAccountPage} />
				<Route path="/set-password" component={SetPasswordPage} />
			</div>) : (<div className="top_display_not_logged">
				<Route path="/sign-up" component={RegisterPage} />
				<Route path="/sign-in" component={LoginPage} />
				<Route path="/reset-password" component={ResetPasswordPage} />
			</div>) }
			{/* <Footer /> */}
			</div>
	);
};

export default TopScreen;
