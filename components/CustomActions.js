import { TouchableOpacity, Text, View, StyleSheet, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as location from 'expo-location';


const CustomActions = ({ 
  wrapperStyle, 
  iconTextStyle, 
  onSend, 
  storage, 
  userID }) => {
    const actionSheet = useActionSheet();
    // Import and use an authorization middleware or custom hook
    // import { useAuthorization } from './authorizationHook';
    // const isAuthorized = useAuthorization();

    const onActionPress = () => {
        // Check authorization before proceeding
        if (!isAuthorized()) {
            Alert.alert("Unauthorized", "You don't have permission to perform this action.");
            return;
        }

        const options = [
            'Choose From Library', 
            'Take Picture', 
            'Send Location', 
            'Cancel'
        ];
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        return;
                    case 1:
                        takePhoto();
                        return;
                    case 2:
                        getLocation();
                    default:
                }
            },
        );
    };

    // ... rest of the code remains unchanged ...


const styles = StyleSheet.create({
    container: {
      width: 26,
      height: 26,
      marginLeft: 10,
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 13,
      borderColor: '#b2b2b2',
      borderWidth: 2,
      flex: 1,
    },
    iconText: {
      color: '#b2b2b2',
      fontWeight: 'bold',
      fontSize: 10,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
  });

    export default CustomActions