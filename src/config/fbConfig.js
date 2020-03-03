import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyCOcIwkJn1_5u6ESKQYEvanoMVkU7DCiFA",
    authDomain: "react-quiz-37929.firebaseapp.com",
    databaseURL: "https://react-quiz-37929.firebaseio.com",
    projectId: "react-quiz-37929",
    storageBucket: "react-quiz-37929.appspot.com",
    messagingSenderId: "779617098763",
    appId: "1:779617098763:web:255c330cc903a05f3dbb0e",
    measurementId: "G-HMWPMRF5DD"
};

firebase.initializeApp(config);
export default firebase.firestore();