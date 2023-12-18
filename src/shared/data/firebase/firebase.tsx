import { FirebaseApp, initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";


const {
  VITE_FIREBASE_APIKEY,
  VITE_FIREBASE_AUTHDOMAIN,
  VITE_FIREBASE_PROJECTID,
  VITE_FIREBASE_STORAGEBUCKET,
  VITE_FIREBASE_MESSAGINGSENDERID,
  VITE_FIREBASE_APPID,
  VITE_FIREBASE_MEASUREMENTID,
  VITE_ENV,
} = import.meta.env;

console.log(VITE_ENV);
const firebaseConfig = {
  apiKey: VITE_FIREBASE_APIKEY,
  authDomain: VITE_FIREBASE_AUTHDOMAIN,
  projectId: VITE_FIREBASE_PROJECTID,
  storageBucket: VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGINGSENDERID,
  appId: VITE_FIREBASE_APPID,
  measurementId: VITE_FIREBASE_MEASUREMENTID,
};
/* eslint-enable @typescript-eslint/no-unsafe-assignment */

const app: FirebaseApp = initializeApp(firebaseConfig);

console.log('Firebase is initiated', app);
// export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);