import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import Note from '../UI/Note';
import './ChatScreen.css';
const ChatScreen = ({ room, setRoom, classes, isTeacher }) => {
	const [search, setSearch] = useState('');
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
			<Note
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
