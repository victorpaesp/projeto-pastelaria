import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import 'firebase/compat/storage';
import 'firebase/database'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAOBusBmDEtDftawR_DySFe-Hk7KlE2htA",
    authDomain: "pastelaria-9dc69.firebaseapp.com",
    databaseURL: "https://pastelaria-9dc69-default-rtdb.firebaseio.com",
    projectId: "pastelaria-9dc69",
    storageBucket: "pastelaria-9dc69.appspot.com",
    messagingSenderId: "307034382835",
    appId: "1:307034382835:web:912791cb2172c7f118b286"
  };

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);