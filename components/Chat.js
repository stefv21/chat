// Chat.js
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.placeholder}>
        Chat screen coming soon!
      </Text>
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="height" />}
      {Platform.OS === 'ios'     && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    fontSize: 16,
    color: '#333',
  },
});

export default Chat;
