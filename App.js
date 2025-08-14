// App.js
import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNetInfo } from '@react-native-community/netinfo';
import { disableNetwork, enableNetwork } from 'firebase/firestore';

import Start from './components/Start';
import Chat from './components/Chat';
import { db } from './firebaseConfig';


const Stack = createStackNavigator();

export default function App() {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

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
          children={props => <Chat {...props} db={db} isConnected={connectionStatus.isConnected} />}
          options={{ title: 'Chat' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
