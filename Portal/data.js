import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import{
  getFirestore, doc, getDocs, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
import{
  getDatabase, ref, get, set, child, update, remove
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

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
  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  const dbf = getFirestore();
  const colRef = collection(dbf,'notices');
  let uid = window.localStorage.getItem("uid");

  window.onload = function getuid (){
    //console.log(uid);
    var database_ref = ref(db);
    let dash = document.getElementById('dash');
    get(child(database_ref,'users/' + uid + '/full_name')).then((snapshot)=>{
      //console.log(snapshot);
      dash.innerHTML  = snapshot.val();
      //console.log(snapshot.val());
    });
    // let username = database_ref.child('users/' + uid + '/full_name');
    // var dash = document.getElementById('dash');
    // username.on('value', snap => dash.innerText = snap.val());
  }

let panelWrapper = document.getElementsByClassName("panel-wrapper")[0];

  getDocs(colRef)
    .then((snapshot)=>{
      let notices = [];
      snapshot.docs.forEach((doc)=>{
        notices.push({ ...doc.data(), id: doc.id})
      })
      notices.forEach((notice)=>{
          const template = `
          <div class="panel-head">
              ${notice.id}
          </div>
          <div class="panel-body">
              ${notice.msg}
          </div>`;
          panelWrapper.innerHTML += template;
      })
    })

const dashboard = document.getElementById("dashboard");
const assignments = document.getElementById("assignment");
const teacher = document.getElementById("teacher");
const schedule = document.getElementById("schedule");
const about = document.getElementById("about");

teacher.addEventListener("click",Teacher());

function Teacher(){
  panelWrapper.innerHTML = '';
  const colTea = collection(dbf,'teachers');
  getDocs(colTea)
  .then((snapshot)=>{
    let teachers = [];
    snapshot.docs.forEach((doc)=>{
      teachers.push({ ...doc.data(), id: doc.id})
    })
    teachers.forEach((teacher)=>{
        const template = `
        <div class="panel-head">
            ${teacher.id}
        </div>
        <div class="panel-body">
            ${teacher.name}
        </div>`;
        panelWrapper.innerHTML += template;
    })
  })
}








