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

// The Chat component displays a simple chat interface
const Chat = ({ route, navigation }) => {
  const { name = 'Chat', backgroundColor = '#fff' } = route?.params || {};

  // Initial messages: system + user message
  const [messages, setMessages] = useState([
    {
      id: '2',
      text: 'You have entered the chat.',
      system: true,
    },
    {
      id: '1',
      text: 'Hello developer',
      user: { id: '2', name: 'React Native' },
    },
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    navigation?.setOptions?.({ title: name });
  }, []);

  // Send a new message
  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      {
        id: Date.now().toString(),
        text: input,
        user: { id: '1', name: 'You' },
      },
      ...prev,
    ]);
    setInput('');
  };

  // Renders each message
  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.system
          ? styles.systemBubble
          : item.user?.id === '1'
          ? styles.myBubble
          : styles.theirBubble,
      ]}
    >
      <Text style={item.system ? styles.systemText : styles.messageText}>
        {item.text}
      </Text>
      {item.user && !item.system && (
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
};

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

export default Chat;
