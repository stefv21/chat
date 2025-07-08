import { useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, TextInput, ImageBackground, Alert } from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(''); // State to hold the selected color

  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth).then(res => {
      console.log("Start.js - res.user.uid:", res.user.uid);
      navigation.navigate("Chat", { userID: res.user.uid, name: name, color: selectedBackgroundColor })
      Alert.alert("Signed in successfully");
    }).catch(err => {
      Alert.alert("Unable to sign in, try again later")
    });
  }

  const handleColorSelection = (color) => {
    setSelectedBackgroundColor(color);
  };


  return (
    <ImageBackground
      source={require('../assets/Background Image.png')}
      style={styles.image}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Let's Chat!</Text>
        <View style={styles.box}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Your Name'
          />
          <View>
            <Text style={styles.backgroundColor}>Choose Background Color:</Text>
          </View>
          <View style={styles.colorOptions}>
            <TouchableOpacity
              style={[styles.colorOption, { backgroundColor: styles.color1.backgroundColor }]}
              onPress={() => handleColorSelection(styles.color1.backgroundColor)}
            />
            <TouchableOpacity
              style={[styles.colorOption, { backgroundColor: styles.color2.backgroundColor }]}
              onPress={() => handleColorSelection(styles.color2.backgroundColor)}
            />
            <TouchableOpacity
              style={[styles.colorOption, { backgroundColor: styles.color3.backgroundColor }]}
              onPress={() => handleColorSelection(styles.color3.backgroundColor)}
            />
            <TouchableOpacity
              style={[styles.colorOption, { backgroundColor: styles.color4.backgroundColor }]}
              onPress={() => handleColorSelection(styles.color4.backgroundColor)}
            />
          </View>
          <Button
            title="Go to Chat"
            onPress={signInUser}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    width: '88%',
    height: '44%',
    backgroundColor: 'white',
    justifyContent: 'space-around', // Changed to space-around for better spacing
    alignItems: 'center',
    paddingVertical: 20, // Added some padding inside the box
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    height: '40%',
    color: '#FFFFFF'
  },
  backgroundColor: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1,
    marginBottom: 10,
  },
  colorOptions: {
    flexDirection: 'row',
    width: '88%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  color1: {
    backgroundColor: '#474056',
  },
  color2: {
    backgroundColor: '#090C08',
  },
  color3: {
    backgroundColor: '#8A95A5',
  },
  color4: {
    backgroundColor: '#B9C6AE',
  }
});

export default Start;