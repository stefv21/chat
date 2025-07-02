// Chat.js
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  FlatList,
  TextInput,
  Button,
  Text,
} from 'react-native';

import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

export default function Chat({ db, route, navigation }) {
  const { name = 'Chat', backgroundColor = '#fff' } = route?.params || {};
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Set nav title & sign in + subscribe to Firestore
  useEffect(() => {
    navigation?.setOptions?.({ title: name });

    const auth = getAuth();
    signInAnonymously(auth).catch(console.error);

    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, snap => {
      const msgs = snap.docs.map(doc => {
        const { text, createdAt, user } = doc.data();
        return {
          id: doc.id,
          text,
          createdAt: createdAt.toDate(),
          user,
        };
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [db, navigation, name]);

  // Send into Firestore
  const sendMessage = async () => {
    if (!input.trim()) return;
    const auth = getAuth();
    await addDoc(collection(db, 'messages'), {
      text: input,
      createdAt: serverTimestamp(),
      user: { id: auth.currentUser.uid, name: 'You' },
    });
    setInput('');
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.user == null
          ? styles.systemBubble
          : item.user.id === getAuth().currentUser.uid
          ? styles.myBubble
          : styles.theirBubble,
      ]}
    >
      <Text style={item.user == null ? styles.systemText : styles.messageText}>
        {item.text}
      </Text>
      {item.user && (
        <Text style={styles.userName}>{item.user.name}</Text>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 90}
    >
      <View style={[styles.container, { backgroundColor }]}>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          inverted
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message"
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  messageBubble: {
    margin: 8,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  myBubble: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  theirBubble: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
  systemBubble: {
    backgroundColor: '#EEE',
    alignSelf: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#222',
  },
  systemText: {
    fontStyle: 'italic',
    color: '#888',
    fontSize: 15,
    textAlign: 'center',
  },
  userName: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#fafafa',
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginRight: 8,
    fontSize: 16,
  },
});
