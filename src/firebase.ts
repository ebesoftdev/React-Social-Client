import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';

const app = firebase.initializeApp( {
  apiKey: "AIzaSyC3q1niKJ-GMCCe4Y8j2jftqWIYxfeeE68",
  authDomain: "reverb-local.firebaseapp.com",
  projectId: "reverb-local",
  storageBucket: "reverb-local.appspot.com",
  messagingSenderId: "491878334504",
  appId: "1:491878334504:web:0ecc86c1da7f1fc6aab51d"
});

export const auth = getAuth(app);
export default app;