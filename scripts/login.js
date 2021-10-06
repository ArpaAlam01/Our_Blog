
// Your web app's Firebase configuration
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
  
// Set up our register function
function register () {
    // Get all our input fields
    email = document.getElementById('reg_email').value
    password = document.getElementById('reg_password').value
    full_name = document.getElementById('full_name').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert("Please input your email and passwords correctly")
        return
    }
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
      Swal.fire("User created successfully!")
    })
    .catch(function(error) {
      var error_code = error.code
      var error_message = error.message
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
      
      data=getUserData(user.uid)
      
      
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  function getUserData(uid) {
        firebase.database().ref('users/' + uid).once("value", snap => {
            sessionStorage.setItem('userData', JSON.stringify(snap));
            window.location.href = 'Project.html';
            console.log(snap.val())
        })
    }
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  