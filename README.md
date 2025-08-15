Chat App

A fully functional React Native chat application built with Expo and Firebase. This project features real-time messaging, image sharing, location sharing, offline message caching, and user authentication.

Why Native vs. Web?

Native apps (iOS & Android) render true UI components (View, Text, TextInput, etc.) rather than HTML elements, providing better performance and access to device APIs.

Web apps run in a browser and use HTML/CSS/JS.

This chat app uses React Native + Expo to maintain one codebase for both platforms.

Prerequisites

• Node.js (v16.19.0 or higher)
• npm or yarn
• Expo CLI (local via npx expo)
• Expo Go app on your device, or Android Studio / Xcode Simulator
• Firebase project with Firestore and Storage enabled

Getting Started

1. Clone the repository
```bash
git clone https://github.com/stefv21/chat.git
cd chat
```

2. Install dependencies
```bash
npm install
```

3. Set up Firebase
   - Create a Firebase project
   - Enable Firestore Database
   - Enable Storage
   - Update `.env` file with your Firebase config

4. Start the Expo server
```bash
npx expo start --clear
```

Run on device or emulator

Physical device: Scan the QR code in the Metro Bundler with Expo Go.

Android Emulator: Press a in the terminal.

iOS Simulator: Press i in the terminal (macOS only).

Project Structure

```
chat/
├── App.js                    # Navigation setup & Firebase integration
├── index.js                  # Expo entry point
├── firebaseConfig.js         # Firebase configuration
├── .env                      # Environment variables
├── components/
│   ├── Start.js             # Start screen (name + color picker)
│   ├── Chat.js              # Real-time chat with GiftedChat
│   └── CustomActions.js     # Image picker & location sharing
├── assets/
│   ├── Background-Image.png # Background image for start screen
│   └── [other images]       # App icons and images
├── android/                 # Android-specific files
└── README.md               # This file
```

Core Dependencies

• **React Native & Expo** - Cross-platform framework
• **Firebase** - Backend services (Firestore, Storage, Auth)
• **React Navigation** - Navigation between screens
• **GiftedChat** - Chat UI components
• **AsyncStorage** - Offline message caching
• **Expo Image Picker** - Camera and photo library access
• **Expo Location** - GPS location sharing
• **NetInfo** - Network connectivity detection

Features

• **Real-time messaging** - Send and receive messages instantly
• **Image sharing** - Take photos or choose from library
• **Location sharing** - Share your current location
• **Offline support** - Messages cached locally when offline
• **Custom backgrounds** - Choose chat background color
• **User authentication** - Secure user identification
• **Cross-platform** - Works on iOS and Android

Usage

1. Enter your name on the start screen
2. Choose a background color
3. Tap "Start Chatting" to enter the chat room
4. Send messages, images, or location
5. Messages sync across all devices in real-time

Recording a Demo

Android Emulator: Extended Controls → Screen record → Start → Demo → Stop → Save .mp4.

iOS Simulator: File > Record Screen → Demo → Click Stop Recording → Saves .mov to Desktop.

Physical iPhone (Expo Go):

Open Control Center (swipe down from top-right corner).

Tap the Screen Recording button (circle inside a circle).

Navigate through your app: enter name, choose color, tap Start Chatting, view chat screen.

Return to Control Center and tap the red record icon to stop; the video is saved to your Photos app

Trim to ~20–30s using QuickTime (macOS) or Photos app (Windows).

License

This project is released under the MIT License.

