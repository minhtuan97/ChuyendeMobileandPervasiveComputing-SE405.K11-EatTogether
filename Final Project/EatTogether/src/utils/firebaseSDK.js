import firebase from 'firebase';
import React, { Component } from 'react';
import { Alert} from 'react-native';

const configMinhTuan = {
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

class FirebaseSDK {

  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp(configMinhTuan);
    }
  }

  userLogin = (email, password) => {
    return new Promise(resolve => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        switch (error.code) {
          case 'auth/invalid-email':
            //console.warn('Invalid email address format.');
            Alert.alert('Invalid email address format.');
            break;
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            //console.warn('Invalid email address or password');
            Alert.alert('Invalid email address or password');
            break;
          default:
            //console.warn('Check your internet connection');
            Alert.alert('Check your internet connection');
        }
        resolve(null);
      }).then(user => {
      if (user) {
        resolve(user);
      }
    });
        // .catch(function(error) {
        //   // Handle Errors here.
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
        //   // ...
        //   Alert.alert(
        //       'Lỗi '+ errorMessage,
        //     )
        // }).then(
        //   Alert.alert(
        //     'Login',
        //     'Đăng nhập thành công',
        //     [
        //       {
        //         text: 'Cancel',
        //         onPress: () => console.log('Cancel Pressed'),
        //         style: 'cancel',
        //       },
        //       {text: 'OK',},
        //     ],
        //     {cancelable: false},
        //   )
        //   user => {
        // if (user) {
        //   resolve(user);
        // }
      //}
    })
  };

  createFirebaseAccount = (name, email, password) => {
    return new Promise(resolve => {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            console.warn('This email address is already taken');
            break;
          case 'auth/invalid-email':
            console.warn('Invalid e-mail address format');
            break;
          case 'auth/weak-password':
            console.warn('Password is too weak');
            break;
          default:
            console.warn('Check your internet connection');
        }
        resolve(false);
      }).then(info => {
        if (info) {
          fire.auth().currentUser.updateProfile({
            displayName: name
          });
          resolve(true);
        }
      });
    });
  };

  sendEmailWithPassword = (email) => {
    return new Promise(resolve => {
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          console.warn('Email with new password has been sent');
          resolve(true);
        }).catch(error => {
          switch (error.code) {
            case 'auth/invalid-email':
              console.warn('Invalid email address format');
              break;
            case 'auth/user-not-found':
              console.warn('User with this email does not exist');
              break;
            default:
              console.warn('Check your internet connection');
          }
          resolve(false);
        });
    })
  };

  // Login
  login = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  };

  // Create Account
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
  
  // Upload Image
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
  
  // 
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
