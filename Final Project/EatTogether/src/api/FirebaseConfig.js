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

const configSiVai = {
    apiKey: "AIzaSyC6V8kFSr1OhfUbdZStspDc52L0PMj_Y_E",
    authDomain: "eattogether-firebase.firebaseapp.com",
    databaseURL: "https://eattogether-firebase.firebaseio.com",
    projectId: "eattogether-firebase",
    storageBucket: "eattogether-firebase.appspot.com",
    messagingSenderId: "1046551399502",
    appId: "1:1046551399502:web:21b81e05eebc237074871f",
    measurementId: "G-0GPG5EHK2M"
  };

export default firebase.initializeApp(configSiVai);