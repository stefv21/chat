// App.js
import React from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import Chat from './components/Chat';  // adjust path if needed


const firebaseConfig = {
  apiKey: "AIzaSyBUJLBenfALRtIBcYAOfIHmbdIGOcQYo78",
  authDomain: "chat-4b65c.firebaseapp.com",
  projectId: "chat-4b65c",
  storageBucket: "chat-4b65c.firebasestorage.app",
  messagingSenderId: "752625705370",
  appId: "1:752625705370:web:d52be3d35ab01683529a23"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  return (
    // pass the Firestore instance into Chat via props
    <Chat db={db} />
  );
}
