import React, { useEffect } from 'react';
import { useState } from 'react';
import Side from '../Components/Side';
import db from '../config';
import { useLocalContext } from '../Context/Context';
import './Class.css';
import { useHistory } from 'react-router-dom';
const Class = ({ match }) => {
	const id = match.params.id;
	// alert(id);
	console.log(id);
	const history = useHistory();
	const { loggedInUser, logout, loggedInMail } = useLocalContext();
	const [isTeacher, setIsTeacher] = useState('');
	const [classDets, setClassDets] = useState('');
	useEffect(() => {
		console.log(!loggedInUser);
		if (!loggedInUser) {
			history.push('/');
		}
	}, [loggedInUser]);
	useEffect(() => {
		if (loggedInMail)
			db.collection('Users')
				.doc(loggedInMail)
				.get()
				.then((snap) => {
					if (snap.exists) {
						setIsTeacher(snap.data().isTeacher);
					}
				});
	}, [loggedInMail]);
	useEffect(() => {
		db.collection('Classes')
			.doc(id)
			.get()
			.then((snap) => {
				setClassDets(snap.data());
			});
	});

	return (
		<div className='class'>
			<Side
				isTeacher={isTeacher}
				loggedInUser={loggedInUser}
				logout={() => {
					logout();
					history.push('/');
				}}
			/>
			<div className='sidethingy'>
				<div className='Head'>
					<p>{classDets.name}</p>
				</div>
				<div className='bod'>{isTeacher ? <></> : <></>}</div>
			</div>
		</div>
	);
};

export default React.memo(Class);
