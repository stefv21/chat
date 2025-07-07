// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import Start from './components/Start';
import Chat from './components/Chat';
import { db } from './firebaseConfig';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBUJLBenfALRtIBcYAOfIHmbdIGOcQYo78",
  authDomain: "chat-4b65c.firebaseapp.com",
  projectId: "chat-4b65c",
  storageBucket: "chat-4b65c.appspot.com",    // note: use .appspot.com
  messagingSenderId: "752625705370",
  appId: "1:752625705370:web:d52be3d35ab01683529a23"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          // Use a render prop so we can pass both the nav props and `db`
          children={props => <Chat {...props} db={db} />}
          options={{ title: 'Chat' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
