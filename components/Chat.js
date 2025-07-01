// Chat.js
import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// The Chat component displays a chat interface using GiftedChat
const Chat = ({ route, navigation }) => {
  // Destructure name and backgroundColor from route parameters (with defaults)
  const { name, backgroundColor } = route.params || { name: 'Chat', backgroundColor: '#fff' };

  // State to hold all chat messages
  const [messages, setMessages] = useState([]);

  // useEffect runs once when component mounts
  useEffect(() => {
    // Set the navigation title to the user's chosen name
    navigation.setOptions({ title: name });

    // Add two static messages to start: one from a user, one system message
    setMessages([
      {
        _id: 1,
        text: 'Hello developer', // user message
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any', // avatar image
        },
      },
      {
        _id: 2,
        text: 'You have entered the chat.', // system message
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  // Function to handle sending new messages
  // Appends new messages to the messages state
  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  }, []);

  // Customizes the chat bubble appearance for left/right messages
  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: '#000' },  // User message bubble
        left: { backgroundColor: '#fff' },   // Other/user message bubble
      }}
    />
  );

  // Main render: wraps content in KeyboardAvoidingView to prevent keyboard overlap
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      // Adjusts view when keyboard is shown on iOS/Android
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // Offset so input isn't hidden; tweak as needed for your app
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 90}
    >
      {/* Main container for chat, uses dynamic background color */}
      <View style={[styles.container, { backgroundColor }]}>
        {/* GiftedChat displays chat messages and handles input */}
        <GiftedChat
          messages={messages}              // feed messages from state
          onSend={onSend}                  // handle sending messages
          user={{ _id: 1 }}                // current user id
          renderBubble={renderBubble}      // customize bubble appearance
        />
      </View>
    </KeyboardAvoidingView>
  );
};

// Styles for the chat container
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// Export Chat so it can be used in the app
export default Chat;
