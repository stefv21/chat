import { addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';


const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { name, color, userID } = route.params;
  const [messages, setMessages] = useState([]);
  const unsubMessages = useRef(null);

  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            📍 Location: {currentMessage.location.latitude.toFixed(4)}, {currentMessage.location.longitude.toFixed(4)}
          </Text>
        </View>
      );
    }
    return null;
  }

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} userID={userID} {...props} />;
  };

  
  useEffect(() => {
    navigation.setOptions({ title: name });
    
    if (isConnected === true) {
      if (unsubMessages.current) unsubMessages.current();
      unsubMessages.current = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages.current = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
          newMessages.push({
            _id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        })
        
        // Add system messages if no messages exist
        if (newMessages.length === 0) {
          newMessages = [
            {
              _id: 1,
              text: 'My message',
              createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://facebook.github.io/react-native/img/header_logo.png',
              },
              image: 'https://facebook.github.io/react-native/img/header_logo.png',
            },
            {
              _id: 2,
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
              location: {
                latitude: 48.864601,
                longitude: 2.398704,
              },
            }
          ];
        }
        
        cacheMessages(newMessages);
        setMessages(newMessages);
      })
    } else {
      loadCachedMessages();
    }

    return () => {
      if (unsubMessages.current) unsubMessages.current();
    }
  }, [isConnected]);

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || "[]";
    setMessages(JSON.parse(cachedMessages));
  };

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(encodeURIComponent(error.message));
    }
  }

  const onSend = (newMessages = []) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
  };

  const renderInputToolbar = (props) => {
    if (isConnected === true) return <InputToolbar {...props} />;
    else return null;
  }

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={onSend}
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
  },
  locationContainer: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    textAlign: 'center',
    padding: 10,
  }
});

export default Chat;