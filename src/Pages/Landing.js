import React from 'react';
import LandingBG from '../Components/LandingBG';
import './landing.css';
import img from '../Assets/login.png';
import { useLocalContext } from '../Context/Context';
import { useHistory } from 'react-router-dom';
const Landing = () => {
	const { login } = useLocalContext();
	const history = useHistory();
	return (
		<LandingBG>
			<div className='dd'>
				<img
					src={img}
					onClick={async () => {
						await login();
						history.push('/home');
					}}
				/>
			</div>
		</LandingBG>
	);
};

export default Landing;
