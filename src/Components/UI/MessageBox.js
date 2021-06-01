import React from 'react';
import './MessageBox.css';
import { storage } from '../../config';
import { useUserContext } from '../../Context/UserContext';

const MessageBox = ({ cont, th, classes, isTeacher, room }) => {
	console.log(cont);
	const storageRef = storage.ref();
	const { loggedInMail } = useUserContext();
	const click = () => {
		console.log(cont.msg);
		console.log('asd');
		if (cont.msg.file) {
			var starsRef = storageRef.child(cont.msg.file);

			// Get the download URL
			starsRef
				.getDownloadURL()
				.then((url) => {
					console.log(url);
					window.open(url);
				})
				.catch((error) => {
					// A full list of error codes is available at
					// https://firebase.google.com/docs/storage/web/handle-errors
					switch (error.code) {
						case 'storage/object-not-found':
							// File doesn't exist
							break;
						case 'storage/unauthorized':
							// User doesn't have permission to access the object
							break;
						case 'storage/canceled':
							// User canceled the upload
							break;

						// ...

						case 'storage/unknown':
							// Unknown error occurred, inspect the server response
							break;
					}
				});
		}
	};
	console.log(room.name);
	if (room.name != 'Submissions')
		return (
			<div
				onClick={click}
				className={`${cont.msg.file ? 'pointer' : ''}`}>
				<div className={`msgContainer ${th ? 'thh' : ''}`}>
					<div className={`mmssgg ${th ? 'th' : ''}`}>
						<div className='msgCon'>
							<p style={{ color: '#5F9EA0', fontWeight: 'bold' }}>
								{cont.msg.user}
							</p>
							<p>{cont.msg.message}</p>
						</div>
					</div>
				</div>
			</div>
		);
	console.log('here');
	if (isTeacher)
		return (
			<div
				onClick={click}
				className={`${cont.msg.file ? 'pointer' : ''}`}>
				<div className={`msgContainer ${th ? 'thh' : ''}`}>
					<div className={`mmssgg ${th ? 'th' : ''}`}>
						<div className='msgCon'>
							<p style={{ color: '#5F9EA0', fontWeight: 'bold' }}>
								{cont.msg.user}
							</p>
							<p>{cont.msg.message}</p>
						</div>
					</div>
				</div>
			</div>
		);
	else if (cont.msg.isTeacher) {
		console.log('asd');
		return (
			<div
				onClick={click}
				className={`${cont.msg.file ? 'pointer' : ''}`}>
				<div className={`msgContainer ${th ? 'thh' : ''}`}>
					<div className={`mmssgg ${th ? 'th' : ''}`}>
						<div className='msgCon'>
							<p style={{ color: '#5F9EA0', fontWeight: 'bold' }}>
								{cont.msg.user}
							</p>
							<p>{cont.msg.message}</p>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		if (cont.msg.email === loggedInMail)
			return (
				<div
					onClick={click}
					className={`${cont.msg.file ? 'pointer' : ''}`}>
					<div className={`msgContainer ${th ? 'thh' : ''}`}>
						<div className={`mmssgg ${th ? 'th' : ''}`}>
							<div className='msgCon'>
								<p
									style={{
										color: '#5F9EA0',
										fontWeight: 'bold',
									}}>
									{cont.msg.user}
								</p>
								<p>{cont.msg.message}</p>
							</div>
						</div>
					</div>
				</div>
			);
		else return null;
	}
};

export default MessageBox;
