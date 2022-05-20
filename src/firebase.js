import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAm9RkFI-NcmiJg45g24i0DMZ__dS-_5N8",
    authDomain: "crud-firebase-3d7cd.firebaseapp.com",
    projectId: "crud-firebase-3d7cd",
    storageBucket: "crud-firebase-3d7cd.appspot.com",
    messagingSenderId: "807215330234",
    appId: "1:807215330234:web:91b2fbc38e4640089de383"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export {firebase}