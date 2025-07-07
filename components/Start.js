// Start.js
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert
} from 'react-native';
import { getAuth, signInAnonymously } from 'firebase/auth';


const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const colorOptions = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
  const auth = getAuth();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleStart = () => {
    if (!name.trim()) {
      Alert.alert('You need a username');
      return;
    }
    signInAnonymously(auth)
      .then(({ user }) => {
        navigation.navigate('Chat', {
          userId: user.uid,
          name: name.trim(),
          backgroundColor: backgroundColor || '#fff',
        });
      })
      .catch(error => {
        console.error('Anonymous sign-in failed:', error);
        Alert.alert('Login failed', error.message);
      });
  };

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require('../assets/bgImage.png')}
      resizeMode="cover"
    >
      <Text style={styles.title}>Chat App</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
        />

        <View style={styles.colorContainer}>
          <Text style={styles.colorText}>Choose Background Color</Text>
          <View style={styles.colorButtonContainer}>
            {colorOptions.map(color => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  backgroundColor === color && {
                    borderWidth: 2,
                    borderColor: '#757083',
                  },
                ]}
                onPress={() => setBackgroundColor(color)}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleStart}
        >
          <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFF',
  },
  container: {
    width: '88%',
    padding: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
  },
  colorContainer: {
    width: '100%',
    marginBottom: 20,
  },
  colorText: {
    fontSize: 16,
    color: '#757083',
    marginBottom: 10,
  },
  colorButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  button: {
    width: '100%',
    padding: 20,
    backgroundColor: '#757083',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default Start;
