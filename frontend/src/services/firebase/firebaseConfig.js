import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCgb-2iMR5Nc7AYYCAl4B1NJXM8vmzHfMc",
  authDomain: "shoesstoremanagement.firebaseapp.com",
  projectId: "shoesstoremanagement",
  storageBucket: "shoesstoremanagement.appspot.com",
  messagingSenderId: "987607796252",
  appId: "1:987607796252:web:6d616e9ed03f49e89dadd9",
  measurementId: "G-2M40GBQPWH",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
