import firebase from 'firebase';
var firebaseConfig = {
	apiKey: 'AIzaSyCVbre_lmXPQ11RW6u-hwYOYwDZw6BwEig',
	authDomain: 'remote-healthcare-939b6.firebaseapp.com',
	databaseURL: 'https://remote-healthcare-939b6-default-rtdb.firebaseio.com',
	projectId: 'remote-healthcare-939b6',
	storageBucket: 'remote-healthcare-939b6.appspot.com',
	messagingSenderId: '861061069382',
	appId: '1:861061069382:web:faa80b918a500af1442847',
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account',
});
const database = firebase.database();
export { auth, provider, database };
export default db;
