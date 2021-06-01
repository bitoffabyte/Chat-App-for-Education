import React from 'react';
import './Box.css';
const Box = ({ children, onClick }) => {
	return (
		<div className='box' onClick={onClick}>
			<p>{children}</p>
		</div>
	);
};

export default Box;
