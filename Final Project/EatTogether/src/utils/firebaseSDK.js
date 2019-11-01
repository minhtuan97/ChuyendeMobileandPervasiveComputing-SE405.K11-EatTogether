import firebase from 'firebase';

class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: "AIzaSyC6V8kFSr1OhfUbdZStspDc52L0PMj_Y_E",
        authDomain: "eattogether-firebase.firebaseapp.com",
        databaseURL: "https://eattogether-firebase.firebaseio.com",
        projectId: "eattogether-firebase",
        storageBucket: "eattogether-firebase.appspot.com",
        messagingSenderId: "1046551399502",
        appId: "1:1046551399502:web:21b81e05eebc237074871f",
        measurementId: "G-0GPG5EHK2M"
      });
    
    }
  }

  login = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  };

  createAccount = async user => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(
        function() {
          console.log(
            'created user successfully. User email:' +
              user.email +
              ' name:' +
              user.name
          );
          var userf = firebase.auth().currentUser;
          userf.updateProfile({ displayName: user.name }).then(
            function() {
              console.log('Updated displayName successfully. name:' + user.name);
              alert(
                'User ' + user.name + ' was created successfully. Please login.'
              );
            },
            function(error) {
              console.warn('Error update displayName.');
            }
          );
        },
        function(error) {
          console.error('got error:' + typeof error + ' string:' + error.message);
          alert('Create account failed. Error: ' + error.message);
        }
      );
  };
  
  uploadImage = async uri => {
    console.log('got image to upload. uri:' + uri);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase
        .storage()
        .ref('avatar')
        .child(uuid.v4());
      const task = ref.put(blob);
  
      return new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          () => {
  
          },
          reject,
          () => resolve(task.snapshot.downloadURL)
        );
      });
    } catch (err) {
      console.log('uploadImage try/catch error: ' + err.message);
    }
  };
  
  updateAvatar = url => {
  
    var userf = firebase.auth().currentUser;
    if (userf != null) {
      userf.updateProfile({ avatar: url }).then(
        function() {
          console.log('Updated avatar successfully. url:' + url);
          alert('Avatar image is saved successfully.');
        },
        function(error) {
          console.warn('Error update avatar.');
          alert('Error update avatar. Error:' + error.message);
        }
      );
    } else {
      console.log("can't update avatar, user is not login.");
      alert('Unable to update avatar. You must login first.');
    }
  };
}
const firebaseSDK = new FirebaseSDK();

export default firebaseSDK;
