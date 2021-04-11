const express = require('express');
const firebase = require('firebase');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

firebase.initializeApp({
	apiKey: 'AIzaSyCVbre_lmXPQ11RW6u-hwYOYwDZw6BwEig',
	authDomain: 'remote-healthcare-939b6.firebaseapp.com',
	databaseURL: 'https://remote-healthcare-939b6-default-rtdb.firebaseio.com',
	projectId: 'remote-healthcare-939b6',
	storageBucket: 'remote-healthcare-939b6.appspot.com',
	messagingSenderId: '861061069382',
	appId: '1:861061069382:web:faa80b918a500af1442847',
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
	const { id, temp, ecg, graph, pulse } = req.body;
	firebase
		.database()
		.ref('location/' + id)
		.set({
			id,
			temp,
			ecg,
			graph,
			pulse,
		});

	console.log(lat, lon);
	res.send('hello there');
});

app.listen(8888, () => console.log('listening on port 8888'));
