import React, { useEffect, useState } from 'react';
import Side from '../Components/Side';
import { useLocalContext } from '../Context/Context';
import './home.css';
import { useHistory } from 'react-router-dom';
import db from '../config';
import Com from '../Components/Com';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase';
import 'firebase/firestore';

const Home = () => {
	const history = useHistory();
	const { logout, loggedInUser, loggedInMail } = useLocalContext();
	const [data, setData] = useState({});
	const [isTeacher, setIsTeacher] = useState('');
	const [pop, setPop] = useState('');
	const [open, setOpen] = useState(false);
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
				.onSnapshot((snap) => {
					if (snap.exists) {
						setData(snap.data());
						setIsTeacher(snap.data().isTeacher);
					}
				});
	}, [loggedInMail]);

	const joinClass = () => {
		let name = '';
		db.collection('Classes')
			.doc(pop)
			.get()
			.then((docSnapshot) => {
				if (docSnapshot.exists) {
					db.collection('Classes')
						.doc(pop)
						.onSnapshot((doc) => {
							name = doc.data().name;
							db.collection('Users')
								.doc(loggedInMail)
								.update({
									classes: firebase.firestore.FieldValue.arrayUnion(
										{
											id: pop,
											name: name,
										}
									),
								});
						});
				} else {
					alert('Invalid id');
				}
			});
		db.collection('Classes')
			.doc(pop)
			.update({
				members: firebase.firestore.FieldValue.arrayUnion(loggedInMail),
			});
	};
	const newClass = () => {
		const id = uuidv4();
		const data = { id, members: [loggedInMail], name: pop };
		db.collection('Classes').doc(id).set(data);
		db.collection('Users')
			.doc(loggedInMail)
			.update({
				classes: firebase.firestore.FieldValue.arrayUnion({
					id,
					name: pop,
				}),
			});
	};
	return (
		<div className='home'>
			<Side
				isTeacher={isTeacher}
				loggedInUser={loggedInUser}
				logout={() => {
					logout();
					history.push('/');
				}}
			/>
			<Com
				classe={data.classes}
				isTeacher={isTeacher}
				setOpen={setOpen}
			/>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				maxWidth='md'
				fullWidth={true}
			>
				<div className='dia'>
					<DialogTitle id='simple-dialog-title'>
						{isTeacher ? 'Create Class' : 'Join Class'}
					</DialogTitle>
					<TextField
						id='standard-basic'
						label={isTeacher ? 'Class Name' : 'Class Id'}
						vlue={pop}
						onChange={(e) => setPop(e.target.value)}
					/>
					<IconButton
						onClick={() => {
							isTeacher ? newClass() : joinClass();
						}}
					>
						<AddIcon className='plus' />
					</IconButton>
				</div>
			</Dialog>
		</div>
	);
};

export default Home;
