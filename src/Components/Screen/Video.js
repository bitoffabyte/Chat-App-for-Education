import React, { useEffect, useState } from 'react';
import './Video.css';
import VideoChat from './VideoChat';
const Video = ({ room, setRoom, classes, isTeacher, loggedInUser }) => {
	const [id, setId] = useState('');
	console.log(loggedInUser);
	useEffect(() => {
		setId(loggedInUser);
	}, [loggedInUser]);
	return (
		<div className='video'>
			<div className='container'>
				<VideoChat id={room.id} room={room} mail={id} />
			</div>
		</div>
	);
};

export default Video;
