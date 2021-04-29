import React, { useEffect } from 'react';
import db from '../config';
import { useLocalContext } from '../Context/Context';
import Landing from './Landing';
import { useHistory } from 'react-router-dom';
const Register = () => {
	const history = useHistory();
	const { loggedInMail, loggedInUser } = useLocalContext();
	useEffect(() => {
		db.collection('Users')
			.doc(loggedInMail)
			.get()
			.then((snap) => {
				if (snap.exists) {
					history.push('/home');
				}
			});
	});
	const registerAs = (isTeacher) => {
		console.log(loggedInUser);
		const stud = {
			email: loggedInMail,
			name: loggedInUser.displayName,
			image: loggedInUser.photoURL,
			isTeacher,
			classes: [],
		};
		console.log(stud);
		db.collection('Users')
			.doc(loggedInMail)
			.set(stud)
			.catch((err) => {
				console.log(err);
				alert('An Error Occured');
			});
		history.push('/home');
	};
	return <Landing reg={!!loggedInUser} registerAs={registerAs} />;
};

export default Register;
