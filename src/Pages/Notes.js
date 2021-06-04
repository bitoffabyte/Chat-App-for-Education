import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import firebase from 'firebase';
import Sidebar from '../Components/UI/Sidebar';
import db from '../config';
import { useUserContext } from '../Context/UserContext';
import './Class.css';
import img from '../assets/cl.png';
import imgg from '../assets/sout.png';
import ChatIcon from '@material-ui/icons/Chat';
import ChatScreen from '../Components/Screen/ChatScreen';
import { Button, Card, Modal } from '@material-ui/core';
import AddStudenBox from '../Components/UI/AddStudenBox';
import NotesScreen from '../Components/Screen/NotesScreen';
const Class = ({ match }) => {
	const id = match.params.id;
	const history = useHistory();
	const { loggedInUser, loggedInMail, logout } = useUserContext();
	const [disp, setDisp] = useState('');
	const [user, setUser] = useState({});
	const [isTeacher, setIsTeacher] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [classes, setClasses] = useState([]);
	const [rooms, setRooms] = useState([]);
	const [selectedRoom, setSelectedRoom] = useState('');
	const [name, setName] = useState('');
	console.log(loggedInUser);
	return (
		<div className='home'>
			<Sidebar>
				<div className='sb'>
					<div className='div1 userDiv'>
						<img src={loggedInUser.photoURL} alt='User' />
						<div>
							<p className='nameroll'>
								{loggedInUser.displayName}
							</p>
						</div>
					</div>
					<div className='middle linksMiddle'>
						<div className='lkl'>
							{/* {isTeacher ? (
								<Button
									className='btn'
									color='secondary'
									onClick={() => setOpenModal(true)}></Button>
							) : null} */}
							{rooms.map((i) => {
								return (
									<div
										className='asddd sideLinks'
										key={i.id}
										onClick={() => setSelectedRoom(i)}>
										<ChatIcon className='icons' />
										<p>{i.name}</p>
									</div>
								);
							})}
						</div>
					</div>
					<div style={{ textAlign: 'left', alignItems: 'left' }}>
						<img
							src={imgg}
							style={{ cursor: 'pointer' }}
							alt='Log out'
							onClick={logout}
						/>
					</div>
				</div>
			</Sidebar>
			<NotesScreen
				isTeacher={isTeacher}
				room={selectedRoom}
				setRoom={setSelectedRoom}
				classes={classes}
			/>
		</div>
	);
};

export default Class;
