// Chat.js
import React, { useState, useEffect, useLayoutEffect } from 'react';  // ← ADDED useLayoutEffect
import { GiftedChat } from 'react-native-gifted-chat';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
} from 'firebase/firestore';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

export default function Chat({ db, route, navigation }) {
  const { userId, name, backgroundColor = '#fff' } = route.params;

  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Chat' });
  }, [navigation]);

  useEffect(() => {
    const msgQuery = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'desc')
    );

    // Import and use Firebase Auth for user authentication
    // import { getAuth } from 'firebase/auth';
    const auth = getAuth();
    if (auth.currentUser) {
      const unsubscribe = onSnapshot(msgQuery, snapshot => {
        const fetched = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: data.user,
          };
        });
        setMessages(fetched);
      });

      return unsubscribe;
    }
  }, [db]);

  const onSend = newMessages => {
    addDoc(
      collection(db, 'messages'),
      newMessages[0]
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{ _id: userId, name }}
          placeholder="Type your message..."
          renderUsernameOnMessage
        />
      </View>
    </KeyboardAvoidingView>
  );
}
