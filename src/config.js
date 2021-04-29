import firebase from 'firebase';
var firebaseConfig = {
	apiKey: 'AIzaSyBANCB7y0ApW-_iN1VsLe_MYU-q7EebpQ8',
	authDomain: 'face-3a6e6.firebaseapp.com',
	databaseURL: 'https://face-3a6e6-default-rtdb.firebaseio.com',
	projectId: 'face-3a6e6',
	storageBucket: 'face-3a6e6.appspot.com',
	messagingSenderId: '133859590463',
	appId: '1:133859590463:web:cd1cc1a4ee60f643fb538a',
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
