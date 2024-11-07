import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage}from "firebase/storage"
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI-z3GNgp-PxTg8lSfzVQaXttqXs8EfhY",
  authDomain: "imageuploader-29137.firebaseapp.com",
  projectId: "imageuploader-29137",
  storageBucket: "imageuploader-29137.appspot.com",
  messagingSenderId: "994692033411",
  appId: "1:994692033411:web:8c6c0d815faf59e783a4b6",
  measurementId: "G-FRP9NB3RLY"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics= getAnalytics(app);
const storage= getStorage(app);
const auth= getAuth(app);
const provider= new GoogleAuthProvider();
export  {storage,auth,provider};