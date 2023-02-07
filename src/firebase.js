// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app'
// auth will be used for the authorization activity.
import 'firebase/compat/auth'
// storage will be used for storing videos
import 'firebase/compat/storage'
// firestore will contain our data, in which key value pair will be stored.
import 'firebase/compat/firestore'


import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCnt0Jo0pUdxAop7cwdki63MU0KVl_C1o",
    authDomain: "reels-app-adba5.firebaseapp.com",
    projectId: "reels-app-adba5",
    storageBucket: "reels-app-adba5.appspot.com",
    messagingSenderId: "575450183708",
    appId: "1:575450183708:web:796f7e34da8bb010a7c7d9"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {
    users: firestore.collection('users'),
    posts: firestore.collection('posts'),
    comments: firestore.collection('comments'),
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage();