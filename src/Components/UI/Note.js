import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import db from '../../config';
import { useUserContext } from '../../Context/UserContext';
import './Chat.css';
import firebase from 'firebase';
import MessageBox from './MessageBox';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { storage } from '../../config';
const Chat = ({ room, setRoom, search, isTeacher, classes }) => {
	const [msg, setMsg] = useState('');
	const [dis, setDis] = useState(true);
	const [messages, setMessages] = useState([]);
	const { loggedInUser, loggedInMail } = useUserContext();
	const ref = useRef();
	const inputFile = useRef(null);
	const storageRef = storage.ref();

	useEffect(() => {
		// console.log(room.id);
		const uns = db
			.collection('Notes')
			.doc(loggedInMail)
			.onSnapshot((snap) => {
				if (snap.exists) {
					const msgg = snap.data().messages;
					setMessages(msgg);
				}
				ref.current.scrollIntoView();
			});
		return () => {
			uns();
		};
	}, [room]);
	useEffect(() => {
		if (msg.length > 0) setDis(false);
		else setDis(true);
	}, [msg]);
	const sendMsg = () => {
		const messagee = {
			user: loggedInUser.displayName,
			email: loggedInMail,
			message: msg,
		};

		console.log(messagee);
		db.collection('Notes')
			.doc(loggedInMail)
			.update({
				messages: firebase.firestore.FieldValue.arrayUnion({
					msg: messagee,
				}),
			})
			.catch(() => {
				db.collection('Notes')
					.doc(loggedInMail)
					.set({ messages: [{ msg: messagee }] });
			});
		setMsg('');
	};
	const onButtonClick = () => {
		console.log('asd');
		inputFile.current.click();
	};
	const onChangeFile = (event) => {
		event.stopPropagation();
		event.preventDefault();
		var file = event.target.files[0];
		if (isTeacher) {
			var sr = storageRef.child(`${classes.id}/${file.name}`);
		} else {
			var sr = storageRef.child(
				`${classes.id}/${loggedInUser.displayName}`
			);
		}
		sr.put(file).then((snap) => {
			console.log('upload');
			const messagee = {
				user: loggedInUser.displayName,
				email: loggedInMail,
				message: file.name,
				isTeacher,
				file: `${classes.id}/${file.name}`,
			};
			// console.log(messagee);
			db.collection('Messages')
				.doc(room.id)
				.update({
					messages: firebase.firestore.FieldValue.arrayUnion({
						msg: messagee,
					}),
				});
		});
		console.log(file);
	};
	return (
		<div className='chatArea'>
			<div className='roomName'>{room.name}</div>
			<input
				type='file'
				id='file'
				ref={inputFile}
				onChange={onChangeFile}
				style={{ display: 'none' }}
			/>

			<div className='chat'>
				{messages.map((i) => {
					if (
						i.msg.message.includes(search) ||
						i.msg.user.includes(search)
					)
						return (
							<MessageBox
								room={room}
								cont={i}
								classes={classes}
								isTeacher={isTeacher}
								key={i.name}
								th={i.msg.email === loggedInMail}
							/>
						);
				})}
				<div ref={ref}></div>
			</div>
			<div className='chatText'>
				{room.name === 'Submissions' ? (
					isTeacher ? (
						<>
							<IconButton onClick={onButtonClick}>
								<AddIcon />
							</IconButton>
							<TextField
								id='standard-basic'
								label='Message'
								variant='filled'
								className='searchBar'
								onChange={(e) => setMsg(e.target.value)}
								value={msg}
							/>
							<Button
								className='btn chatSubmitBtn'
								color='secondary'
								disabled={dis}
								onClick={sendMsg}>
								Send
							</Button>
						</>
					) : (
						<IconButton onClick={onButtonClick}>
							<AddIcon />
						</IconButton>
					)
				) : (
					<>
						<TextField
							id='standard-basic'
							label='Message'
							variant='filled'
							className='searchBar'
							onChange={(e) => setMsg(e.target.value)}
							value={msg}
						/>
						<Button
							className='btn chatSubmitBtn'
							color='secondary'
							disabled={dis}
							onClick={sendMsg}>
							Send
						</Button>
					</>
				)}
			</div>
		</div>
	);
};

export default Chat;
