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
import { getStorage } from 'firebase/storage';

// Import dotenv for environment variables
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID } from '@env';

// Validate environment variables
if (!FIREBASE_API_KEY || !FIREBASE_AUTH_DOMAIN || !FIREBASE_PROJECT_ID || !FIREBASE_STORAGE_BUCKET || !FIREBASE_MESSAGING_SENDER_ID || !FIREBASE_APP_ID) {
  throw new Error('Missing required Firebase environment variables');
}

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID
};

let app, auth, db, storage;

try {
  // Initialize the Firebase App
  app = initializeApp(firebaseConfig);
  
  // Initialize Auth with AsyncStorage-based persistence
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  
  // Initialize Firestore
  db = getFirestore(app);
  
  // Initialize Storage
  storage = getStorage(app);
} catch (error) {
  console.error('Firebase initialization failed:', error.message);
  throw new Error('Failed to initialize Firebase services');
}

export { auth, db, storage };
