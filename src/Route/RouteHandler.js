import React, { useEffect, useState } from 'react';
import { useLocalContext } from '../Context/Context';
import { useHistory } from 'react-router-dom';

import db from '../config';
import Landing from '../Pages/Landing';
const RouteHandler = () => {
	const history = useHistory();

	const { loggedInMail } = useLocalContext();
	const [createdClasses, setCreatedClasses] = useState([]);
	useEffect(() => {
		db.collection('Users')
			.doc(loggedInMail)
			.get()
			.then((snap) => {
				if (snap.exists) {
					history.push('/home');
				} else {
					history.push('/reg');
				}
			});
	}, []);
	return <Landing />;
};

export default RouteHandler;
