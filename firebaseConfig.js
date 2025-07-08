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

// Import dotenv for environment variables
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID } from '@env';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID
};

// Initialize the Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage-based persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Firestore instance remains the same
export const db = getFirestore(app);
