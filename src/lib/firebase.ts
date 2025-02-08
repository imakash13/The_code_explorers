
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-XVeHG1o2KQkOYL9iNdzbONE5Hf8Qez8",
  authDomain: "library-management-6e410.firebaseapp.com",
  projectId: "library-management-6e410",
  storageBucket: "library-management-6e410.appspot.com",
  messagingSenderId: "120419987067",
  appId: "1:120419987067:web:c65119561469c1959b7cde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
auth.useDeviceLanguage();

// Initialize Cloud Firestore
export const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.error('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.error('The current browser does not support offline persistence');
    }
});