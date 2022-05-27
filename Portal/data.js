import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import{
  getFirestore, doc, getDocs, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
import{
  getDatabase, ref, get, set, child, update, remove
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
import{
  getStorage, ref as sref, uploadBytesResumable, getDownloadURL}
 from "https://www.gstatic.com/firebasejs/9.1.0/firebase-storage.js";


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
  let staff = 0;

  window.onload = function getuid (){
    //console.log(uid);
    var database_ref = ref(db);
    let dash = document.getElementById('dash');
    get(child(database_ref,'users/' + uid + '/full_name')).then((snapshot)=>{
      //console.log(snapshot);
      dash.innerHTML  = snapshot.val();
      //console.log(snapshot.val());
    });
    let portal = document.getElementById('staff');
    let users = document.getElementById('listUsers');
    get(child(database_ref,'users/' + uid + '/staff')).then((snapshot)=>{
      //console.log(snapshot);
      if(snapshot.val() === 'Yes'){
        staff = 1;
        portal.innerHTML = 'Staff';
        users.innerHTML = 'Students Rating';
      }
      else{
        portal.innerHTML = 'Student';
      }
      //console.log(snapshot.val());
    });
    dashboard();
    
    // let username = database_ref.child('users/' + uid + '/full_name');
    // var dash = document.getElementById('dash');
    // username.on('value', snap => dash.innerText = snap.val());
  }

let panelWrapper = document.getElementsByClassName("panel-wrapper")[0];



const dash = document.getElementById("dashboard");
const assignments = document.getElementById("assignment");
const listUsers = document.getElementById("listUsers");
const about = document.getElementById("about");

listUsers.addEventListener('click',ListUsers);
assignments.addEventListener('click',assignment);
dash.addEventListener('click',dashboard);
about.addEventListener('click',aboutFun);

function dashboard(){
  panelWrapper.innerHTML='';
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
      }
      
      )
      
    })
  }

  var files=[];
  var reader = new FileReader();
  var Fname = '';
   


function assignment(){

  panelWrapper.innerHTML='';
  if(staff == 0){
    panelWrapper.innerHTML += `<label>Assignment Name</label> <input type="text" id='namebox'><label id="extlab"></label><br><br>
    <label id="upprogress"></label><br><br>
    
    <button id="selbtn">Select File</button>
    <button id="upbtn">Upload File</button> <br><br><hr>
    <div class="panel-body">
            <ul>
              <li>Assignment 1 </li>
              <li>Assignment 2 </li>
            </ul>
        </div>`;
  }
  else{const template = `
  <div class="panel-head">
      Student1
  </div>
  <div class="panel-body">
      <ul>
        <li><a href="#">Assignment 1 Link</a></li>
        <li><a href="#">Assignment 2 Link</a></li>
      </ul>
  </div>
  <div class="panel-head">
      Student2
  </div>
  <div class="panel-body">
      <ul>
        <li><a href="#">Assignment 1 Link</a></li>
        <li><a href="#">Assignment 2 Link</a></li>
      </ul>
  </div>
  <div class="panel-head">
      Student3
  </div>
  <div class="panel-body">
      <ul>
        <li><a href="#">Assignment 1 Link</a></li>
        <li><a href="#">Assignment 2 Link</a></li>
      </ul>
  </div>`;
  panelWrapper.innerHTML += template;}
  
    
  

  var input = document.createElement('input');
  var namebox = document.getElementById('namebox');
  var selbtn = document.getElementById('selbtn');
  var upbtn = document.getElementById('upbtn');
   input.type = 'file';

  input.onchange = e => {
    files = e.target.files;
    Fname = files[0].name;

    namebox.value = Fname;
    reader.readAsDataURL(files[0]);
  }
  selbtn.onclick = function(){
    input.click();
  }
  upbtn.onclick = UploadProcess();


}


async function UploadProcess(){
  var FileToUpload = files[0];
  var FileName = Fname;
  const storage = getStorage();
  const storageRef = sref(storage, "Assignment/"+FileName);
  const UploadTask = uploadBytesResumable(storageRef, FileToUpload);
  getDownloadURL(UploadTask.snapshot.ref).then((downloadURL)=>{
    console.log(downloadURL);
  })
}

async function ListUsers(){
  panelWrapper.innerHTML = '';
  let colusr = collection(dbf,'teachers');
  if(staff === 0){
    colusr = collection(dbf,'teachers');
  }
  else{
    colusr = collection(dbf,'students');
  }
  const docSnap = await getDocs(colusr);
  if(docSnap){
    let users = [];
    docSnap.docs.forEach((doc)=>{
      users.push({ ...doc.data(), id: doc.id})
    })
    var x =1;
    users.forEach((user)=>{
        const template = `
        <div class="panel-head">
            ${user.id}
        </div>
        <div class="panel-body">
            ${user.name} : ${user.email}
        </div><h1>Rating</h1>
        <fieldset class="rating">
        <input type="radio" id="star5_${x}" name="rating_${x}" value="5" /><label class = "full" for="star5_${x}" title="Awesome - 5 stars"></label>
        <input type="radio" id="star4half_${x}" name="rating_${x}" value="4 and a half" /><label class="half" for="star4half_${x}" title="Pretty good - 4.5 stars"></label>
        <input type="radio" id="star4_${x}" name="rating_${x}" value="4" /><label class = "full" for="star4_${x}" title="Pretty good - 4 stars"></label>
        <input type="radio" id="star3half_${x}" name="rating_${x}" value="3 and a half" /><label class="half" for="star3half_${x}" title="Meh - 3.5 stars"></label>
        <input type="radio" id="star3_${x}" name="rating_${x}" value="3" /><label class = "full" for="star3_${x}" title="Meh - 3 stars"></label>
        <input type="radio" id="star2half_${x}" name="rating_${x}" value="2 and a half" /><label class="half" for="star2half_${x}" title="Kinda bad - 2.5 stars"></label>
        <input type="radio" id="star2_${x}" name="rating_${x}" value="2" /><label class = "full" for="star2_${x}" title="Kinda bad - 2 stars"></label>
        <input type="radio" id="star1half_${x}" name="rating_${x}" value="1 and a half" /><label class="half" for="star1half_${x}" title="Meh - 1.5 stars"></label>
        <input type="radio" id="star1_${x}" name="rating_${x}" value="1" /><label class = "full" for="star1_${x}" title="Sucks big time - 1 star"></label>
        <input type="radio" id="starhalf_${x}" name="rating_${x}" value="half" /><label class="half" for="starhalf_${x}" title="Sucks big time - 0.5 stars"></label>
        </fieldset>`;
        x=x+1;
        panelWrapper.innerHTML += template;
    })
  }
  // getDocs(colTea)
  // .then((snapshot)=>{
  //   let teachers = [];
  //   snapshot.docs.forEach((doc)=>{
  //     teachers.push({ ...doc.data(), id: doc.id})
  //   })
  //   teachers.forEach((teacher)=>{
  //       const template = `
  //       <div class="panel-head">
  //           ${teacher.id}
  //       </div>
  //       <div class="panel-body">
  //           ${teacher.name}
  //       </div>`;
  //       panelWrapper.innerHTML += template;
  //   })
  // })
}

function aboutFun(){
  panelWrapper.innerHTML = ' ';
  var database_ref = ref(db);
  get(child(database_ref,'users/' + uid)).then((snapshot)=>{
    const template = `
        <div class="panel-head">
            Full Name
        </div>
        <div class="panel-body">
            ${snapshot.val().full_name}
        </div>
        <div class="panel-head">
            Email
        </div>
        <div class="panel-body">
            ${snapshot.val().email}
        </div>
        <div class="panel-head">
            Unique ID
        </div>
        <div class="panel-body">
            ${snapshot.val().unique_identification}
        </div>`;
    // panelWrapper.innerHTML =' '+ snapshot.val().full_name;
    // panelWrapper.innerHTML =' '+ snapshot.val().email;
    // panelWrapper.innerHTML =' '+ snapshot.val().unique_identification;
    panelWrapper.innerHTML +=template;
  })
}









