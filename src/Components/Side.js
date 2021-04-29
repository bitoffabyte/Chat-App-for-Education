import img2 from '../assets/Group 18.png';
import img3 from '../assets/Group 20.png';
import { useHistory } from 'react-router-dom';
import './side.css';
const Side = ({ loggedInUser, isTeacher, logout }) => {
	console.log(isTeacher);
	const history = useHistory();
	return (
		<div className='side'>
			<div className='boxinside'>
				<div className='header'>
					<img src={loggedInUser ? loggedInUser.photoURL : ' '} />
					<div>
						<p className='name'>
							{loggedInUser ? loggedInUser.displayName : ''}
						</p>
						<p className='stud'>
							{isTeacher ? 'Teacher' : 'Student'}
						</p>
					</div>
				</div>
				<div>
					<img
						src={img2}
						className='btn'
						onClick={() => {
							history.push('/home');
						}}
					/>
					<br />
					<br />
					<br />
				</div>
				<img src={img3} className='btn' onClick={logout} />
			</div>
		</div>
	);
};

export default Side;
