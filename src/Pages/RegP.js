import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import HomeScreen from '../Components/Screen/HomeScreen';
import db from '../config';
import { useUserContext } from '../Context/UserContext';
import './RegP.css';
const RegP = () => {
	const [reg, setReg] = useState('');
	const [dis, setDis] = useState(true);
	const { loggedInMail, loggedInUser } = useUserContext();
	const history = useHistory();
	useEffect(() => {
		if (/\d\d[A-Z][A-Z][A-Z]\d\d\d\d/.test(reg.toUpperCase())) {
			setDis(false);
		}
	}, [reg]);
	const Reg = () => {
		const data = {
			email: loggedInMail,
			name: loggedInUser.displayName,
			regNo: reg,
			image: loggedInUser.photoURL,
			isTeacher: false,
			classes: [],
		};
		db.collection('Users').doc(loggedInMail).set(data);
		history.push('/home');
	};
	return (
		<HomeScreen>
			<div className='bsd'>
				<div className='asd'>
					<TextField
						id='filled-basic'
						label='Register No'
						variant='filled'
						className='yeet'
						onChange={(e) => setReg(e.target.value)}
						value={reg}
					/>
					<br />
					<Button
						className='reg_btn'
						color='secondary'
						disabled={dis}
						onClick={Reg}>
						Continue
					</Button>
				</div>
			</div>
		</HomeScreen>
	);
};

export default RegP;
