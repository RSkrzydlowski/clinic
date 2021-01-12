import React, { useEffect, useState } from 'react';
import authService from './services/auth';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [ currentUser, setCurrentUser ] = useState(null);
	const [ initialized, setInitialized ] = useState(false);

	useEffect(() => {
		authService.onAuthStateChanged(setCurrentUser);
		console.log(currentUser);
		async function initialize() {
			const cu = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
			console.log('init');
			console.log(cu);
			if (cu) {
				await authService.refresh(JSON.parse(cu));
			}
			setInitialized(true);
		}

		initialize();
	}, []);

	return initialized ? <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider> : null;
};
