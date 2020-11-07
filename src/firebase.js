import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAbVgOlNrCmZ74Lbkxn0m-zbO09z5lPNrU",
  authDomain: "fir-15bf3.firebaseapp.com",
  databaseURL: "https://fir-15bf3.firebaseio.com",
  projectId: "fir-15bf3",
  storageBucket: "fir-15bf3.appspot.com",
  messagingSenderId: "177463196684",
  appId: "1:177463196684:web:3afefae49ea9bf9e674229",
  measurementId: "G-8QWB3N5VGW"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
