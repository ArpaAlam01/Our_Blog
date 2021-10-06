userData=JSON.parse(sessionStorage.getItem('userData'));
console.log(userData)
username = userData["full_name"]
document.getElementById("userName").innerHTML = username.split(" ")[0];
const firebaseConfig = {
    apiKey: "AIzaSyABIaMpP6wg3YYWohGP1-Mzt7ibpZblwIE",
    authDomain: "login-project-192ad.firebaseapp.com",
    projectId: "login-project-192ad",
    storageBucket: "login-project-192ad.appspot.com",
    messagingSenderId: "36576015325",
    appId: "1:36576015325:web:5496fd45a74949ca1a7c34",
    measurementId: "G-EY4YJDYDJF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

function logout(){
    firebase.auth().signOut().then(function() {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }, function(error) {
        console.log("Error");
    });
}