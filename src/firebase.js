import firebase from 'firebase';


const firebaseApp = firebase.initializeApp({
apiKey: "AIzaSyBzzHEtw2OGqI2xmF0O8afGz5XE8lndP1c",
  authDomain: "todo-list-7b1de.firebaseapp.com",
  databaseURL: "https://todo-list-7b1de.firebaseio.com",
  projectId: "todo-list-7b1de",
  storageBucket: "todo-list-7b1de.appspot.com",
  messagingSenderId: "396497398013",
  appId: "1:396497398013:web:87ed5d6c3241cc4fa2b694",
  measurementId: "G-H79TD7PR0Y"
});


const db = firebaseApp.firestore();

export default db;

