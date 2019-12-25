
//Configure Realtime Database Rules
  
// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
apiKey: "apiKey",
authDomain: "projectId.firebaseapp.com",
databaseURL: "https://databaseName.firebaseio.com",
storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

// Structure Your Database


// Read and Write Data on the Web

// Get a database reference

// Get a reference to the database service
var database = firebase.database();

// Reading and writing data

//Basic write operations
function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }