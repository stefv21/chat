// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBUJLBenfALRtIBcYAOfIHmbdIGOcQYo78",
  authDomain: "chat-4b65c.firebaseapp.com",
  projectId: "chat-4b65c",
  storageBucket: "chat-4b65c.appspot.com",
  messagingSenderId: "752625705370",
  appId: "1:752625705370:web:d52be3d35ab01683529a23"
};

// Initialize once
const app = initializeApp(firebaseConfig);

// Export the auth and db instances
export const auth = getAuth(app);
export const db = getFirestore(app);
