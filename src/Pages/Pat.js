import React, { useEffect, useState } from 'react';
import './home.css';
import db from '../config';
import { useLocalContext } from '../Context/Context';
import { useHistory, useLocation } from 'react-router';
const Pat = () => {
	const { loggedInMail } = useLocalContext();
	const [loc, setLoc] = useState([]);
	const location = useLocation();
	useEffect(() => {
		db.collection('Patient')
			.get()
			.then((querySnapshot) => {
				const documents = querySnapshot.docs.map((doc) => doc.data());
				console.log(documents);
				setLoc(documents);
			})
			.catch((e) => console.log(e));
	});
	const history = useHistory();
	return (
		<div className='asd'>
			<div className='left'>
				<div className='leftHead'>Remote Health</div>
				<br />
				<br />
				<br />
				<br />
				<div
					className='tabs'
					onClick={() => history.push('/location')}
					style={{
						color: location.pathname.includes('location')
							? '#336cfb'
							: 'gray',
					}}>
					Locations
				</div>
				<div
					className='tabs'
					style={{
						color: !location.pathname.includes('location')
							? '#336cfb'
							: 'gray',
					}}
					onClick={() => history.push('/patients')}>
					Patients
				</div>
			</div>
			<div className='right'>
				<div
					style={{ display: 'flex', marginTop: '20%', width: '80%' }}>
					{loc.map((i) => (
						<div
							className='dds'
							onClick={() => history.push(`/patient/${i.Name}`)}>
							{i.Name}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Pat;
