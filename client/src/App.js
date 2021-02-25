import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './pages/main/mainPage';
import { AuthProvider } from './authentication';
import './App.scss';
import { LoaderProvider, Oval } from '@agney/react-loading';

class App extends React.Component {
	render() {
		return (
			<AuthProvider>
				<BrowserRouter>
					<LoaderProvider indicator={<Oval width="50" />}>
						<MainPage />
					</LoaderProvider>
				</BrowserRouter>
			</AuthProvider>
		);
	}
}

export default App;
