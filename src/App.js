import './App.css';
import Landing from './Pages/Landing';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useLocalContext } from './Context/Context';
import Home from './Pages/Home';
import Loc from './Pages/Loc';
import Pat from './Pages/Pat';
import PetDet from './Pages/PatDet';
function App() {
	const { loggedInUser, logout } = useLocalContext();
	console.log(!!loggedInUser);

	return (
		<Router className='App'>
			<Switch>
				<Route path='/' exact>
					<Landing />
				</Route>
				<Route path='/location' exact>
					<Home />
				</Route>
				<Route path='/patients' exact>
					<Pat />
				</Route>
				<Route
					path='/location/:id'
					render={({ match }) => <Loc match={match} />}></Route>{' '}
				<Route
					path='/patient/:id'
					render={({ match }) => <PetDet match={match} />}></Route>
			</Switch>
		</Router>
	);
}
export default App;
