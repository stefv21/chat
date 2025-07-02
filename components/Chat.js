// Chat.js
import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
} from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

export default function Chat({ db, route, navigation }) {
  const {
    userId,            // extracted anonymous UID
    name,              // extracted user name
    backgroundColor = '#fff',
  } = route.params || {};

  const [messages, setMessages] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    navigation.setOptions({ title: 'Chat' });
    signInAnonymously(auth).catch(console.error);

    const messagesRef = collection(db, 'messages');
    const messagesQuery = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => {
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

    return () => unsubscribe();
  }, [db, navigation, auth]);

  // Save sent messages to Firestore
  const onSend = (newMessages = []) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
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