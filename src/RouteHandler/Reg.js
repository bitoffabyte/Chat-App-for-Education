import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useUserContext } from '../Context/UserContext';
import db from '../config';
import RegP from '../Pages/RegP';
import { CircularProgress } from '@material-ui/core';
import HomeScreen from '../Components/Screen/HomeScreen';

const Reg = () => {
	const history = useHistory();
	const [load, setLoad] = useState(true);
	const { loggedInMail, loggedInUser } = useUserContext();
	const [createdClasses, setCreatedClasses] = useState([]);
	useEffect(() => {
		db.collection('Users')
			.doc(loggedInMail)
			.get()
			.then((snap) => {
				if (snap.exists) {
					history.push('/home');
					setLoad(false);
				} else {
					db.collection('Teacher')
						.doc(loggedInMail)
						.get()
						.then((snap) => {
							if (snap.exists) {
								const data = {
									email: loggedInMail,
									name: loggedInUser.displayName,
									image: loggedInUser.photoURL,
									isTeacher: true,
									classes: [],
								};
								db.collection('Users')
									.doc(loggedInMail)
									.set(data);
								history.push('/home');
								setLoad(false);
							}
						});
				}
				setLoad(false);
			});
	}, []);
	if (load)
		return (
			<HomeScreen>
				<CircularProgress />
			</HomeScreen>
		);

	return <RegP />;
};

export default Reg;
