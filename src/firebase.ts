import firebase from 'firebase/compat/app'
import { getAuth } from "firebase/auth"

// const app = firebase.initializeApp( {
// 	apiKey: "AIzaSyCo_yP9t0895CcCwX-uU4KOP69ioWrwCn8",
// 	authDomain: "auth-redux-bb19a.firebaseapp.com",
// 	projectId: "auth-redux-bb19a",
// 	storageBucket: "auth-redux-bb19a.appspot.com",
// 	messagingSenderId: "45081832379",
// 	appId: "1:45081832379:web:84c013efc60f96a5b4f29e"

// const app = firebase.initializeApp( {
// 	apiKey: "AIzaSyAn8qrDSkPbfAYsfDcVOR8uPvvONS4kaKU",
// 	authDomain: "reverb2-5c9e5.firebaseapp.com",
// 	projectId: "reverb2-5c9e5",
// 	storageBucket: "reverb2-5c9e5.appspot.com",
// 	messagingSenderId: "422796656720",
// 	appId: "1:422796656720:web:0ac1e3165fdd55bc7e9155"
// })

const app = firebase.initializeApp( {
	apiKey: "AIzaSyA7yH90NTz5v2OCDC0gYk3OUkAv4unDCAs",
	authDomain: "alreverb3.firebaseapp.com",
	projectId: "alreverb3",
	storageBucket: "alreverb3.appspot.com",
	messagingSenderId: "261611516418",
	appId: "1:261611516418:web:497986d4b9a78c554a2d1b"
} )
  

export const auth = getAuth( app );

export default app;