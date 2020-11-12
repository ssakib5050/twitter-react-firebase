import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyC7lGgcoY7B8JYAs63GYEHaVhl6RQ9fgEU",
  authDomain: "twitter-react-firebase-c8ca2.firebaseapp.com",
  databaseURL: "https://twitter-react-firebase-c8ca2.firebaseio.com",
  projectId: "twitter-react-firebase-c8ca2",
  storageBucket: "twitter-react-firebase-c8ca2.appspot.com",
  messagingSenderId: "507144387043",
  appId: "1:507144387043:web:dee0011a1c1486195388d6",
  measurementId: "G-JC57QCJRKN",
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { firebase, db, auth, storage };
