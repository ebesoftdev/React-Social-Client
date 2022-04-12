import firebase from 'firebase/compat/app'
import { getAuth } from "firebase/auth"

const app = firebase.initializeApp( {
	apiKey: "AIzaSyBfJDCpJftA1lz_oQYmoInyIRTzw6G7_4Y",
	authDomain: "reverb-66734.firebaseapp.com",
	projectId: "reverb-66734",
	storageBucket: "reverb-66734.appspot.com",
	messagingSenderId: "14724849972",
	appId: "1:14724849972:web:7721167f956e8cd64f8561"
} )


export const auth = getAuth( app );

export default app;
