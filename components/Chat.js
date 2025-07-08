// Chat.js
import React, { useState, useEffect, useLayoutEffect } from 'react';
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
  // Destructure route params without fallback to avoid re-renders
  const { userId, name, backgroundColor = '#fff' } = route.params;

  const [messages, setMessages] = useState([]);

  // Set header title once, without triggering re-renders
  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Chat' });
  }, [navigation]);

  // Real-time listener for messages, only re-run when `db` changes
  useEffect(() => {
    const messagesQuery = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'desc')
    );

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

    return unsubscribe;
  }, [db]);

  // Save sent messages to Firestore
  const onSend = (newMessages) => {
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
