// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBL_QiPzpigUfasiGlzxL1_GNV3NOXkxYw",
    authDomain: "collegewebsite-64188.firebaseapp.com",
    projectId: "collegewebsite-64188",
    storageBucket: "collegewebsite-64188.appspot.com",
    messagingSenderId: "78808713766",
    appId: "1:78808713766:web:82bdc2a9a5ccb96247b4e7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  let uid = window.localStorage.getItem("uid");

  window.onload = function getuid (){
    console.log(uid);
    var database_ref = database.ref();
    let tep = database_ref.child('users/' + uid + '/full_name');
    var dash = document.getElementById('dash');
    tep.on('value', snap => dash.innerText = snap.val());
    console.log(tep);
  }