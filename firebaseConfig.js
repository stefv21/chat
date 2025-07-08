// firebaseConfig.js
import { initializeApp } from 'firebase/app';

// Replace getAuth with initializeAuth & persistence helpers
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';

// Import AsyncStorage for React Native persistence
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBUJLBenfALRtIBcYAOfIHmbdIGOcQYo78",
  authDomain: "chat-4b65c.firebaseapp.com",
  projectId: "chat-4b65c",
  storageBucket: "chat-4b65c.appspot.com",
  messagingSenderId: "752625705370",
  appId: "1:752625705370:web:d52be3d35ab01683529a23"
};

// Initialize the Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage-based persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Firestore instance remains the same
export const db = getFirestore(app);
