import './App.css';
import Landing from './Pages/Landing';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { useLocalContext } from './Context/Context';
import RouteHandler from './Route/RouteHandler';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Class from './Pages/Class';

function App() {
	const { loggedInUser, logout } = useLocalContext();
	console.log(!!loggedInUser);

	return (
		<Router className='App'>
			<Switch>
				<Route path='/' exact>
					{loggedInUser ? <RouteHandler /> : <Landing />}
				</Route>
				<Route path='/reg' exact>
					<Register reg={!!loggedInUser} />
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
