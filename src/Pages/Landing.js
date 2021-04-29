import React from 'react';
import LandBG from '../Components/LandBG';
import './landing.css';
import img from '../assets/Group 17.png';
import img1 from '../assets/Group 15.png';
import img2 from '../assets/Group 16.png';
import logo from '../assets/Group.svg';
import { useLocalContext } from '../Context/Context';
const Landing = ({ reg, registerAs }) => {
	const { login, logout } = useLocalContext();
	return (
		<LandBG>
			<div className='ins'>
				<p className='title'>Intract</p>
				{reg ? <p className='tag'> Register As </p> : null}

				<br />
				<br />
				<br />
				{reg ? (
					<>
						<img
							src={img1}
							className='signin'
							onClick={() => registerAs(true)}
						/>
						<br />
						<br />
						<br />
						<img
							src={img2}
							className='signin'
							onClick={() => registerAs(false)}
						/>
					</>
				) : (
					<img src={img} className='signin' onClick={login} />
				)}
			</div>
			<img src={logo} className='image' />
		</LandBG>
	);
};

export default Landing;
