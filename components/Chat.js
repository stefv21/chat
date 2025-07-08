import { addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomActions from './CustomActions';

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { name, color, userID } = route.params;
  const [messages, setMessages] = useState([]);

  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name });
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
          newMessages.push({
            _id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        })
        cacheMessages(newMessages);
        setMessages(newMessages);
      })
    } else loadCachedMessages();

    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

  const onSend = async (newMessages) => {
    console.log('onSend in Chat.js called with:', newMessages);
    try {
      await addDoc(collection(db, "messages"), newMessages[0]);
      console.log('Message sent to Firestore successfully!');
    } catch (error) {
      console.error('Error sending message to Firestore:', error);
      // Optionally, display an error message to the user
    }
  }

  const renderInputToolbar = (props) => {
    if (isConnected === true) return <InputToolbar {...props} />;
    else return null;
  }

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000" // Customize bubble colors
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  const renderCustomActions = (props) => {
    return <CustomActions
      userID={userID}
      storage={storage}
      onSend={onSend} // Make sure this is the correct onSend function from Chat.js
      {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={messages => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Chat;