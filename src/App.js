import './App.css';
import HomeP from './Pages/HomeP';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { useUserContext } from './Context/UserContext';
import Reg from './RouteHandler/Reg';
import Home from './Pages/Home';
import Class from './Pages/Class';

function App() {
	const { loggedInUser, logout } = useUserContext();
	// logout();
	return (
		<Router>
			<Switch>
				<Route path='/' exact>
					{loggedInUser == null ? <HomeP /> : <Reg />}
				</Route>
				<Route path='/home' exact>
					<Home />
				</Route>
				<Route
					path='/class/:id'
					render={({ match }) => <Class match={match} />}></Route>
			</Switch>
		</Router>
	);
}

export default App;
