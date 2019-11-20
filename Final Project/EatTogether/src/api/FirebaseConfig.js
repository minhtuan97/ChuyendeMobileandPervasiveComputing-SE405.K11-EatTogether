import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAFw1N1TprRQAAqDzuhwHA4sBlXBk1ejiQ",
    authDomain: "eattogetherdb.firebaseapp.com",
    databaseURL: "https://eattogetherdb.firebaseio.com",
    projectId: "eattogetherdb",
    storageBucket: "eattogetherdb.appspot.com",
    messagingSenderId: "1074702581493",
    appId: "1:1074702581493:web:839f1b64bfc375542d0fbc",
    measurementId: "G-2C7F9P3YD4"
};
const fire = firebase.initializeApp(config);
export default fire;