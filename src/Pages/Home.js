import React, { useEffect, useState } from 'react';
import './home.css';
import db from '../config';
import { useLocalContext } from '../Context/Context';
const Home = () => {
	const { loggedInMail } = useLocalContext();
	const [loc, setLoc] = useState([]);
	useEffect(() => {
		db.collection('Locations')
			.doc(loggedInMail)
			.onSnapshot((snap) => {
				setLoc(snap.data().Locations);
			});
	});
	return (
		<div className='asd'>
			<div className='left'>
				<div className='leftHead'>Remote Health</div>
				<br />
				<br />
				<br />
				<br />
				<div className='tabs'>Locations</div>
				<div className='tabs un'>Patients</div>
			</div>
			<div className='right'>
				<div
					style={{ display: 'flex', marginTop: '20%', width: '80%' }}>
					{loc.map((i) => (
						<div className='dds'>{i}</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
