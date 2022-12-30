import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";
// import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { mode } from "./mainConfig";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();
// export const functions = getFunctions(app);

//emulators
if(mode === 'development'){
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, "localhost", 9199);
  // connectFunctionsEmulator(functions, "localhost", 5001); //hooks up callable functions to the emulator.  for https functions: Each HTTPS function in your code will be served from the local emulator using the following URL format: http://$HOST:$PORT/$PROJECT/$REGION/$NAME.  For example a simple helloWorld function with the default host port and region would be served at: https://localhost:5001/$PROJECT/us-central1/helloWorld.  for background triggered functions, auth, firestore, realtime database, and pub/sub are supported  
}
