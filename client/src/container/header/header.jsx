import React, {useState, useContext} from 'react';
import './header.scss';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../authentication';
import authService from "../../services/auth";

const Header = () => {
	return (
		<div className="main_div">
			<p>Clinic</p>
		</div>
	)

};

export default Header;
