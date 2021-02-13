import React, { useContext } from 'react';
import './mainPage.scss';
import Header from '../../container/header';
import Footer from '../../container/footer';
import { BrowserRouter } from 'react-router-dom';
import TopScreen from '../../container/topScreen';
import Sidebar from '../../container/sidebar';
import { AuthContext } from '../../authentication';

const MainPage = () => {
	const { currentUser } = useContext(AuthContext);
	return ( <BrowserRouter>
		<React.Fragment>
			<Header />
			{currentUser && <Sidebar />}
			<TopScreen />
			<div className="top">


			</div>

		</React.Fragment>
	</BrowserRouter> );
}


export default MainPage;
