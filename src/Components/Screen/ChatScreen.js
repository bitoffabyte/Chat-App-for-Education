import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useUserContext } from '../../Context/UserContext';
import Chat from '../UI/Chat';
import './ChatScreen.css';
import Video from './Video';
const ChatScreen = ({ room, setRoom, classes, isTeacher }) => {
	const [search, setSearch] = useState('');
	const { loggedInMail } = useUserContext();

	if (room.name === 'Call')
		return (
			<Video
				loggedInUser={loggedInMail}
				room={room}
				setRoom={setRoom}
				classes={classes}
				isTeacher={isTeacher}
			/>
		);

	return (
		<div className='chatBox'>
			<div className='chatdiv'>
				<TextField
					id='standard-basic'
					label='Search'
					variant='filled'
					className='searchBar'
					onChange={(e) => setSearch(e.target.value)}
					value={search}
				/>
			</div>
			<Chat
				classes={classes}
				room={room}
				setRoom={setRoom}
				search={search}
				isTeacher={isTeacher}
			/>
		</div>
	);
};

export default ChatScreen;
