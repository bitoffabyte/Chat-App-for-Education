import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import Chat from '../UI/Chat';
import './ChatScreen.css';
const ChatScreen = ({ room, setRoom }) => {
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
			<Chat room={room} setRoom={setRoom} search={search} />
		</div>
	);
};

export default ChatScreen;
