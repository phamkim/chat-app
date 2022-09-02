import firebase from "firebase/app";

import 'firebase/analytics'
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBUu6TGFy0Uz4oD6kY8fdKcfH5P4yFe3qc",
    authDomain: "chat-app-cc74b.firebaseapp.com",
    projectId: "chat-app-cc74b",
    storageBucket: "chat-app-cc74b.appspot.com",
    messagingSenderId: "892851164120",
    appId: "1:892851164120:web:c129f2b46c09a21dc5d8ad",
    measurementId: "G-YFGPRVRN4S"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();


const auth = firebase.auth();
const db = firebase.firestore();


auth.useEmulator('http://localhost:9099');
if (window.location.hostname === 'localhost') {
    db.useEmulator('localhost', '8080');
}

export { auth, db };
export default firebase;