import React from 'react';
import './mainPage.scss';
import Header from '../../container/header';
import Footer from '../../container/footer';
import { BrowserRouter } from 'react-router-dom';
import TopScreen from '../../container/topScreen';
import Sidebar from '../../container/sidebar';

class MainPage extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<React.Fragment>
					<Header />
					<div className="top">
						<Sidebar />
						<TopScreen />
					</div>
					<Footer />
				</React.Fragment>
        <p>main page</p>
			</BrowserRouter>
		);
	}
}

export default MainPage;
