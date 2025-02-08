import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";






// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-XVeHG1o2KQkOYL9iNdzbONE5Hf8Qez8",
  authDomain: "library-management-6e410.firebaseapp.com",
  projectId: "library-management-6e410",
  storageBucket: "library-management-6e410.appspot.com",
  messagingSenderId: "120419987067",
  appId: "1:120419987067:web:c65119561469c1959b7cde",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Authentication
export const auth = getAuth(app);
auth.useDeviceLanguage(); // Optional: Set language based on device

// ✅ Initialize Firestore
export const firestoreDb = getFirestore(app);

// ✅ Enable offline persistence safely
const enablePersistence = async () => {
  try {
    await enableIndexedDbPersistence(firestoreDb);
    console.log("🔥 Firestore offline persistence enabled");
  } catch (err: unknown) {
    switch ((err as { code: string }).code) {
      case "failed-precondition":
        console.error("❌ Multiple tabs open, persistence can only be enabled in one tab.");
        break;
      case "unimplemented":
        console.error("❌ This browser does not support offline persistence.");
        break;
      default:
        console.error("❌ Firestore persistence error:", err);
    }
  }
};

enablePersistence();

// ✅ Export everything properly
export { app, firestoreDb as db };
