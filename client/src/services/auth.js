import regeneratorRuntime from 'regenerator-runtime';
import React from 'react';
import { APP_URL } from '../data/constant';

const signIn = async ({ email, password }) => {
	const url = `${APP_URL}/api/users/login`;
	fetch(url, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email: email,
			password: password
		})
	}).then(async (res) => {
		const { success, error, id, token, role, email, name } = await res.json();
		if (!success) {
			alert(error);
		} else {
			const currentUser = {
				role: role,
				name: name,
				email: email,
				id: id
				// bearer: `Bearer ${token}`
			};
			localStorage.setItem('currentUser', JSON.stringify(currentUser));
			onAuthStateChangedCallback(currentUser);
			window.location.href = 'http://localhost:3000/me';
		}
	});
};
const refresh = async (currentUser) => {
	const res = await fetch(`${APP_URL}/api/users/refresh`, {
		headers: { Authorization: currentUser.bearer }
	});
	if (res.status === 401) {
		signOut();
	} else {
		// const { token } = await res.json();
		// currentUser.bearer = `Bearer ${token}`;
		localStorage.setItem('currentUser', JSON.stringify(currentUser));
		onAuthStateChangedCallback(currentUser);
	}
};
const signOut = () => {
	localStorage.removeItem('currentUser');
	onAuthStateChangedCallback(null);
};
let onAuthStateChangedCallback = null;
const onAuthStateChanged = (callback) => {
	onAuthStateChangedCallback = callback;
};

export default { signIn, refresh, signOut, onAuthStateChanged };
