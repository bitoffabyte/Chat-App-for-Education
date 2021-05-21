import firebase from 'firebase';
var firebaseConfig = {
	apiKey: 'AIzaSyDPXUccbEDXrGIt_oHF989wD4v_7yCIBEM',
	authDomain: 'swe-project-a68d1.firebaseapp.com',
	projectId: 'swe-project-a68d1',
	storageBucket: 'swe-project-a68d1.appspot.com',
	messagingSenderId: '892917806326',
	appId: '1:892917806326:web:bdbd905aec3215d0a828d7',
};
// Initialize Firebase
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
