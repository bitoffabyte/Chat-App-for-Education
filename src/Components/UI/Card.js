import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Card.css';
const Card = ({ addClass }) => {
	const [classname, setClassname] = useState('');
	const [dis, setDis] = useState(true);
	useEffect(() => {
		if (classname.length > 1) setDis(false);
	}, [classname]);
	return (
		<div className='card'>
			<TextField
				id='filled-basic'
				label='Class Name'
				variant='filled'
				color='secondary'
				className='cname'
				onChange={(e) => {
					setClassname(e.target.value);
				}}
				value={classname}
			/>
			<div className='buttondiv'>
				<Button
					className='btn'
					color='secondary'
					disabled={dis}
					onClick={() => addClass(classname)}>
					Add Class
				</Button>
			</div>
		</div>
	);
};

export default Card;
