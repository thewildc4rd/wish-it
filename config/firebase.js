import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAJ_-uvATFXd6BLm-XjlF-3dR3Dz2bXUfE',
  authDomain: 'wish-it-5c5c0.firebaseapp.com',
  projectId: 'wish-it-5c5c0',
  storageBucket: 'wish-it-5c5c0.appspot.com',
  messagingSenderId: '939687037450',
  appId: '1:939687037450:web:368a632f2253a87541adf3',
  measurementId: 'G-LBPJDCZPQ0',
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
