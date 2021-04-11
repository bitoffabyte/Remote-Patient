import './App.css';
import Landing from './Pages/Landing';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useLocalContext } from './Context/Context';
import Home from './Pages/Home';
import Loc from './Pages/Loc';

function App() {
	const { loggedInUser, logout } = useLocalContext();
	console.log(!!loggedInUser);

	return (
		<Router className='App'>
			<Switch>
				<Route path='/' exact>
					<Landing />
				</Route>
				<Route path='/home' exact>
					<Home />
				</Route>
				<Route
					path='/location/:id'
					render={({ match }) => <Loc match={match} />}></Route>
			</Switch>
		</Router>
	);
}
export default App;
