import React, { useEffect, useState } from 'react';
import db from '../config';
import './loc.css';
import vid from '../Assets/huh.mp4';
import ReactPlayer from 'react-player';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Loc = ({ match }) => {
	const id = match.params.id;
	const [val, setVal] = useState([]);
	const [pd, setpd] = useState([]);
	const location = useLocation();
	const history = useHistory();
	console.log(location.pathname);
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
	const [s, ss] = useState(false);
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
							<br />
							<br />
							<br />
							<Button
								variant='contained'
								color='primary'
								onClick={() => ss((p) => !p)}>
								Dispense Medicines
							</Button>

							<div
								style={{
									marginTop: '10%',
									display: s ? 'block' : 'none',
								}}>
								<Button
									variant='contained'
									color='secondary'
									style={{ margin: '1%' }}
									onClick={() =>
										setTimeout(() => alert('Done'), 1000)
									}>
									Paracetamol
								</Button>
								Qty: 10
								<br />
								<Button
									variant='contained'
									color='secondary'
									onClick={() =>
										setTimeout(() => alert('Done'), 1000)
									}
									style={{ margin: '1%' }}>
									Coldac
								</Button>
								Qty: 8
								<br />
								<Button
									variant='contained'
									color='secondary'
									onClick={() =>
										setTimeout(() => alert('Done'), 1000)
									}
									style={{ margin: '1%' }}>
									Aspirine
								</Button>
								Qty: 5
								<br />
								<Button
									variant='contained'
									color='secondary'
									onClick={() =>
										setTimeout(() => alert('Done'), 1000)
									}
									style={{ margin: '1%' }}>
									Cetirizine
								</Button>
								Qty: 11
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Loc;
