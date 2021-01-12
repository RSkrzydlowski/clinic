import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './pages/main/mainPage';
import { AuthProvider } from './authentication';
import './App.scss';

class App extends React.Component {
	render() {
		return (
			<AuthProvider>
				<BrowserRouter>
					<MainPage />
				</BrowserRouter>
			</AuthProvider>
		);
	}
}

export default App;
