import React, { useEffect, useState } from 'react';
import db from '../config';
import './loc.css';
import vid from '../Assets/huh.mp4';
import ReactPlayer from 'react-player';

const Loc = ({ match }) => {
	const id = match.params.id;
	const [val, setVal] = useState([]);
	const [pd, setpd] = useState([]);
	useEffect(() => {
		db.collection('Loc')
			.doc(id)
			.onSnapshot((snap) => {
				if (snap) {
					setVal(snap.data());
				}
			});
	}, []);
	useEffect(() => {
		db.collection('Patient')
			.doc(val.PatientId)
			.get()
			.then((data) => {
				setpd(data.data());
			})
			.catch((err) => {
				console.log(err);
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
			<div className='right rightt'>
				<div className='dfs'>
					<div className='l'>
						<div className='video'>
							<ReactPlayer
								url={vid}
								width='100%'
								loop={true}
								muted={true}
								controls={false}
								playing={true}
							/>
						</div>
						<div className='data'>
							<p>Location: {id}</p>
							<br />
							<div style={{ display: 'flex' }}>
								<p style={{ margin: '2%' }}>
									Temperature : {val.Temp}
								</p>
								<p style={{ margin: '2%' }}>
									Pulse : {val.Pulse}
								</p>
								<p style={{ margin: '2%' }}>
									SPO2 : {val.spo}{' '}
								</p>
							</div>
						</div>
					</div>
					<div className='r'>
						<h1>Patient History</h1>
						<div style={{ width: '80%' }}>
							<p style={{ margin: '2%', fontSize: '1vw' }}>
								Name : {pd ? pd.Name : ''}{' '}
							</p>
							<p style={{ margin: '2%', fontSize: '1vw' }}>
								Prescriptions : {pd ? pd.pres : ''}{' '}
							</p>
							<p style={{ margin: '2%', fontSize: '1vw' }}>
								History: {pd ? pd.history : ''}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Loc;
