// Import two functions of firebase
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
// initializeApp - It's used to start the conextion with the firebase.
// getFirestore - It's used to get an instance of Firestore. 

// Our web app's Firebase configuration. In this object is include the access key to the DB.
const firebaseConfig = {
  apiKey: "AIzaSyDOXUZgw3TgmxJt6wt-u5Z2mbhDRtTnDVc",
  authDomain: "fantasy-store-8c2b3.firebaseapp.com",
  projectId: "fantasy-store-8c2b3",
  storageBucket: "fantasy-store-8c2b3.appspot.com",
  messagingSenderId: "936207988004",
  appId: "1:936207988004:web:6e6201f866cd87298b6fb1"
};

// Initialize Firebase. This returns an instance of Firebase
const app = initializeApp(firebaseConfig);

//We export this reference so it is available for all the app.
export const db = getFirestore(app)