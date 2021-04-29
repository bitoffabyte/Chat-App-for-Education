import './com.css';
import { useHistory } from 'react-router-dom';
const Com = ({ classe, loggedInUser, isTeacher, setOpen }) => {
	const history = useHistory();
	const RetClassBox = (i, index) => {
		console.log('asd');
		return (
			<div
				className='boxx'
				id={index}
				onClick={() => history.push(`/class/${i.id}`)}
			>
				{i.name}
			</div>
		);
	};
	return (
		<div className='ddd'>
			<div className='com'>
				<div className='head'>
					<p className='mc'>My Classes</p>
					<p className='nc' onClick={() => setOpen(true)}>
						{isTeacher ? 'Create new Class' : 'Join new Class'}
					</p>
				</div>
				<div className='classes'>
					{classe
						? classe.map((i, index) => {
								console.log(i);
								return RetClassBox(i, index);
						  })
						: null}
				</div>
			</div>
		</div>
	);
};

export default Com;
