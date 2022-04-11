import firebase from 'firebase/compat/app'
import { getAuth } from "firebase/auth"

const app = firebase.initializeApp( {
	apiKey: "AIzaSyABi_EHVtEU9I0CnAtt2PZg8FPgaaIfcYk",
	authDomain: "p3-reverb.firebaseapp.com",
	projectId: "p3-reverb",
	storageBucket: "p3-reverb.appspot.com",
	messagingSenderId: "403894159227",
	appId: "1:403894159227:web:1fe4d1267981afde9a9fde"
} )


export const auth = getAuth( app );

export default app;
